/**
 * Zero-Dependency Memory Manager Extension for Pi Coding Agent
 *
 * Saves, indexes, and retrieves structured project memory/documentation
 * inside the centralized parent directory `repos/docs/<project-name>/`.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import * as fs from "fs";
import * as path from "path";

// Centralized parent directory for all project docs
const DOCS_BASE_DIR = "/Users/rf/repos/docs";

/**
 * Resolves the active project name from the current working directory.
 * If working from "repos/project-a", project name is "project-a".
 */
function getActiveProject(cwd: string): string {
  const normalizedCwd = path.resolve(cwd).replace(/\\/g, "/");
  const parts = normalizedCwd.split("/");
  const reposIndex = parts.indexOf("repos");
  if (reposIndex !== -1 && parts[reposIndex + 1]) {
    return parts[reposIndex + 1];
  }
  return path.basename(cwd) || "default-project";
}

/**
 * Ensures the project documentation directories exist.
 */
function ensureDirs(project: string) {
  const projectDir = path.join(DOCS_BASE_DIR, project);
  const topicsDir = path.join(projectDir, "topics");
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }
  if (!fs.existsSync(topicsDir)) {
    fs.mkdirSync(topicsDir, { recursive: true });
  }
  return { projectDir, topicsDir };
}

/**
 * Updates the centralized memory-index.md file.
 */
function updateIndex(project: string, topic: string, summary: string) {
  const { projectDir } = ensureDirs(project);
  const indexPath = path.join(projectDir, "memory-index.md");
  const timestamp = new Date().toISOString().split("T")[0];

  let indexContent = `# Project Memory Index: ${project}\n\n`;
  indexContent += `| Topic | Summary | Last Updated |\n`;
  indexContent += `| :--- | :--- | :--- |\n`;

  const rows: Record<string, { summary: string; date: string }> = {};

  // Load existing index if it exists
  if (fs.existsSync(indexPath)) {
    const raw = fs.readFileSync(indexPath, "utf-8");
    const lines = raw.split("\n");
    for (const line of lines) {
      if (line.startsWith("|") && !line.includes("Topic | Summary") && !line.includes(":---")) {
        const parts = line.split("|").map((p) => p.trim());
        if (parts.length >= 4) {
          const tName = parts[1];
          const tSummary = parts[2];
          const tDate = parts[3];
          if (tName) {
            rows[tName] = { summary: tSummary, date: tDate };
          }
        }
      }
    }
  }

  // Update or insert current topic
  rows[topic] = { summary, date: timestamp };

  // Write index back to disk
  for (const [tName, data] of Object.entries(rows)) {
    indexContent += `| ${tName} | ${data.summary} | ${data.date} |\n`;
  }

  fs.writeFileSync(indexPath, indexContent, "utf-8");
}

export default function (pi: ExtensionAPI) {
  // Register the record_memory tool
  pi.registerTool({
    name: "record_memory",
    description:
      "Saves or updates a project memory file inside the parent directory 'repos/docs/<project-name>/' and indexes it. Use this to persist architecture designs, decisions, API contracts, and domain models.",
    schema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "Unique name of the topic (e.g. 'database-schema', 'auth-flow', 'state-management').",
        },
        summary: {
          type: "string",
          description: "A short, one-sentence description of what this memory covers (used for the central index).",
        },
        content: {
          type: "string",
          description: "Full markdown content containing technical details, decisions, configurations, or instructions.",
        },
      },
      required: ["topic", "summary", "content"],
    },
    handler: async (args, ctx) => {
      const project = getActiveProject(ctx.cwd);
      const { topicsDir } = ensureDirs(project);
      const topicFile = path.join(topicsDir, `${args.topic}.md`);

      // Write topic file
      fs.writeFileSync(topicFile, args.content, "utf-8");

      // Update central index
      updateIndex(project, args.topic, args.summary);

      return {
        success: true,
        message: `Memory recorded for topic '${args.topic}' inside repos/docs/${project}/topics/${args.topic}.md, and memory-index.md updated.`,
      };
    },
  });

  // Register the retrieve_memory tool
  pi.registerTool({
    name: "retrieve_memory",
    description:
      "Retrieves the content of a previously recorded project memory file from 'repos/docs/<project-name>/topics/<topic>.md'. Only call this when you need specific details about a topic.",
    schema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "The name of the topic to retrieve.",
        },
      },
      required: ["topic"],
    },
    handler: async (args, ctx) => {
      const project = getActiveProject(ctx.cwd);
      const { topicsDir } = ensureDirs(project);
      const topicFile = path.join(topicsDir, `${args.topic}.md`);

      if (!fs.existsSync(topicFile)) {
        return {
          success: false,
          message: `Memory topic '${args.topic}' does not exist for project '${project}'. Check the index to see available topics.`,
        };
      }

      const content = fs.readFileSync(topicFile, "utf-8");
      return {
        success: true,
        topic: args.topic,
        content,
      };
    },
  });

  // Register /mem index command
  pi.registerCommand("mem", {
    description: "Display the central memory index for the current project.",
    handler: async (_args, ctx) => {
      const project = getActiveProject(ctx.cwd);
      const indexPath = path.join(DOCS_BASE_DIR, project, "memory-index.md");

      if (!fs.existsSync(indexPath)) {
        ctx.agent.message(`No memory index found for project '${project}'. Use the 'record_memory' tool to create one.`);
        return;
      }

      const indexContent = fs.readFileSync(indexPath, "utf-8");
      ctx.agent.message(indexContent);
    },
  });

  // On session start — read the index and let the agent know what memories exist
  pi.on("session_start", (event, ctx) => {
    const project = getActiveProject(ctx.cwd);
    const indexPath = path.join(DOCS_BASE_DIR, project, "memory-index.md");

    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, "utf-8");
      ctx.agent.message(`## 🧠 Project Memory Index (repos/docs/${project}/)

You have access to the following indexed memories. Do NOT load these files unless the task requires them. If you need details about any topic, call the \`retrieve_memory\` tool:

${indexContent}
`);
    } else {
      ctx.agent.message(`## 🧠 Project Memory Index

No memory index exists for project '${project}' yet. If you resolve a complex task or design a system, use the \`record_memory\` tool to document it.`);
    }
  });
}
