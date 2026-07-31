/**
 * TDD Enforcer Extension for Pi Coding Agent
 *
 * Programmatically enforces Test-Driven Development (TDD) rules.
 * Intercepts tool calls to write or edit source files and ensures
 * that a corresponding test file exists or is created/modified first.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// Keep track of files touched during the session
const touchedTestFiles = new Set<string>();

export default function (pi: ExtensionAPI) {
  // Reset tracker on session start
  pi.on("session_start", () => {
    touchedTestFiles.clear();
  });

  pi.on("tool_call", (event) => {
    const { toolName, args } = event;

    // Check if the agent is trying to write or modify a source file
    if (toolName === "write" || toolName === "edit" || toolName === "write_file" || toolName === "replace_file_content") {
      const path: string = args?.path ?? args?.TargetFile ?? "";
      
      // We only care about source code files in the src/ folder
      const isSourceFile = /\bsrc\b.*?\.(tsx|ts|jsx|js)$/i.test(path);
      const isTestFile = /\.(test|spec)\.(tsx|ts|jsx|js)$/i.test(path);

      if (isTestFile) {
        // Track that the agent has created or modified a test file
        touchedTestFiles.add(path.replace(/\.(test|spec)\.(tsx|ts|jsx|js)$/i, ""));
      }

      if (isSourceFile && !isTestFile) {
        const componentBaseName = path.replace(/\.(tsx|ts|jsx|js)$/i, "");
        
        // If this component doesn't have a tracked test file, warn/remind or enforce
        const hasCorrespondingTest = Array.from(touchedTestFiles).some(testPath => 
          componentBaseName.startsWith(testPath) || testPath.startsWith(componentBaseName)
        );

        if (!hasCorrespondingTest) {
          // Soft enforcement: Inject a mandatory instruction to write tests first
          return {
            block: false, // Let it proceed but issue a high-priority system warning
            warning: 
              `[TDD ENFORCER WARNING]: You are editing the source file "${path}" ` +
              `but no corresponding test file has been created or modified in this session. ` +
              `You must write a failing test FIRST before implementing features or fixes.`
          };
        }
      }
    }
  });
}
