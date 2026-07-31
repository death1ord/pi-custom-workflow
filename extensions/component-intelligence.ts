/**
 * Component Intelligence Extension for Pi Coding Agent
 *
 * Registers custom tools that the LLM can invoke to analyze
 * React component trees, extract type information, and check
 * test coverage for the current project.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

export default function (pi: ExtensionAPI) {
  // ─────────────────────────────────────────────────────────
  // Tool: analyze_component — Deep-scan a React component file
  // ─────────────────────────────────────────────────────────
  pi.registerTool({
    name: "analyze_component",
    label: "Analyze React Component",
    description:
      "Analyze a React component file and return a structured report: " +
      "props interface, hooks used, child components rendered, state shape, " +
      "line count, and detected code smells.",
    parameters: Type.Object({
      filePath: Type.String({
        description: "Absolute or relative path to the component file (.tsx/.jsx)",
      }),
    }),
    async execute(_toolCallId, params) {
      // The agent will read the file and produce the analysis via its own capabilities.
      // This tool acts as a structured prompt that ensures consistent output format.
      return {
        content: [
          {
            type: "text",
            text: `Analyze the React component at "${params.filePath}". Produce a structured report with these sections:

## Component Analysis: ${params.filePath}

### 1. Overview
- Component name and export type (default/named)
- Total lines of code
- File type (.tsx/.jsx/.ts/.js)

### 2. Props Interface
- List all props with their TypeScript types
- Flag any props typed as \`any\` or \`object\`
- Flag missing prop interface definition

### 3. State & Hooks
- List all useState calls with initial values
- List all useEffect calls with dependency arrays
- List all custom hooks used
- Flag: missing useEffect dependencies, missing cleanup, derived state in effects

### 4. Child Components
- List all child components rendered in JSX
- Flag prop drilling (same prop passed through without use)

### 5. Code Smells Detected
- God component (>200 lines)?
- Inline objects/arrays/functions in JSX?
- Direct DOM manipulation?
- Missing error boundaries?
- Accessibility issues?

### 6. Recommendations
- Specific refactoring steps to improve this component`,
          },
        ],
      };
    },
  });

  // ─────────────────────────────────────────────────────────
  // Tool: check_test_coverage — Find untested components/hooks
  // ─────────────────────────────────────────────────────────
  pi.registerTool({
    name: "check_test_coverage",
    label: "Check Test Coverage",
    description:
      "Scan the project source directory and identify components and hooks " +
      "that do not have corresponding test files.",
    parameters: Type.Object({
      sourceDir: Type.String({
        description: "Source directory to scan (e.g., 'src' or 'src/components')",
      }),
    }),
    async execute(_toolCallId, params) {
      return {
        content: [
          {
            type: "text",
            text: `Scan "${params.sourceDir}" for test coverage gaps:

1. List all .tsx/.ts component and hook files.
2. For each file, check if a corresponding .test.tsx/.test.ts or .spec.tsx/.spec.ts exists (co-located or in __tests__/).
3. Produce a coverage report:

| File | Has Test? | Test Path |
|------|-----------|-----------|

4. Summary: X of Y files have tests (Z% coverage).
5. Priority list: Which untested files are highest-risk (most imported, most complex)?`,
          },
        ],
      };
    },
  });

  // ─────────────────────────────────────────────────────────
  // Tool: suggest_commit — Generate stealth commit message
  // ─────────────────────────────────────────────────────────
  pi.registerTool({
    name: "suggest_commit",
    label: "Suggest Commit Message",
    description:
      "Analyze the current git diff and suggest a clean conventional commit " +
      "message. NEVER execute the commit. Present it for the developer.",
    parameters: Type.Object({
      scope: Type.Optional(
        Type.String({
          description: "Optional scope hint (e.g., 'auth', 'dashboard', 'hooks')",
        })
      ),
    }),
    async execute(_toolCallId, params) {
      const scopeHint = params.scope ? ` (scope hint: ${params.scope})` : "";
      return {
        content: [
          {
            type: "text",
            text: `Review the current git diff and suggest a commit:

1. Run \`git diff --staged\` (or \`git diff\` if nothing is staged).
2. Analyze the changes${scopeHint}.
3. Generate a conventional commit message following the project's existing commit style.
4. Format examples:
   - feat(auth): add JWT refresh token handler
   - fix(dashboard): handle null user state on initial load
   - refactor(hooks): extract useUserProfile from UserPage
   - test(login): add integration tests for form validation

5. Present the FULL commit command for the developer to copy-paste:
   \`\`\`bash
   git add <specific files>
   git commit -m "type(scope): description"
   \`\`\`

CRITICAL: Do NOT execute git commit. Only suggest it.
CRITICAL: Do NOT add any AI co-author tags or metadata.`,
          },
        ],
      };
    },
  });
}
