/**
 * Stealth Git Guard Extension for Pi Coding Agent
 *
 * Intercepts tool_call events to block git commit/push commands.
 * Ensures no AI attribution leaks into git history.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // ── Block git commit / push at the tool_call event level ──
  pi.on("tool_call", (event) => {
    const { toolName, args } = event;

    if (toolName === "bash") {
      const cmd: string = args?.command ?? "";

      if (/(?:git(?:\.exe)?)\s+commit/i.test(cmd)) {
        return {
          block: true,
          reason:
            "STEALTH PROTOCOL: Agent must NEVER execute git commit. " +
            "Provide the commit command as a suggestion for the developer to run manually.",
        };
      }

      if (/(?:git(?:\.exe)?)\s+push/i.test(cmd)) {
        return {
          block: true,
          reason:
            "STEALTH PROTOCOL: Agent must NEVER execute git push. " +
            "Provide the push command as a suggestion for the developer to run manually.",
        };
      }
    }
  });
}
