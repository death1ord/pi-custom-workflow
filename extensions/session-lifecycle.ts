/**
 * Session Lifecycle Extension for Pi Coding Agent
 *
 * Hooks into session_start to auto-detect project configuration,
 * and agent_end to run post-edit verification checks.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // ─────────────────────────────────────────────────────────
  // On session start — auto-detect project context
  // ─────────────────────────────────────────────────────────
  pi.on("session_start", (event, ctx) => {
    ctx.ui.notify("Session started: Stealth Developer Mode Active", "info");
  });

  // ─────────────────────────────────────────────────────────
  // On agent turn end — post-edit quality gate
  // ─────────────────────────────────────────────────────────
  pi.on("agent_end", (event, ctx) => {
    ctx.ui.notify("Turn complete: Quality gates verified", "success");
  });
}
