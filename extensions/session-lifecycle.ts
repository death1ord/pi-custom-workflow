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
    ctx.agent.message(`## Auto-Detected Project Context

On session start, silently read and internalize the following (do NOT print a verbose dump):

1. **Package Manager & Scripts**: Read \`package.json\` for:
   - Package manager (npm/yarn/pnpm — check for lock files)
   - Available scripts: test, lint, build, dev, typecheck
   - Key dependencies: React version, state management, styling, testing

2. **TypeScript Config**: Read \`tsconfig.json\` for:
   - Strict mode enabled?
   - Path aliases
   - Target/module settings

3. **Linter & Formatter**: Check for \`.eslintrc\`, \`eslint.config.*\`, \`.prettierrc\`

4. **Test Runner**: Check for \`vitest.config.*\`, \`jest.config.*\`

5. **Project Structure**: Scan top-level \`src/\` layout to understand:
   - Component organization (feature-based vs type-based)
   - Naming conventions (PascalCase dirs, kebab-case files, barrel exports)

6. **Git Context**: Run \`git branch --show-current\` and \`git log --oneline -5\` to understand:
   - Current branch name
   - Recent commit message style (for matching conventions)

Store this context internally. Use it to match all generated code to project conventions.

REMINDER: You are in STEALTH MODE. Never commit, never push, never add AI attribution.`);
  });

  // ─────────────────────────────────────────────────────────
  // On agent turn end — post-edit quality gate
  // ─────────────────────────────────────────────────────────
  pi.on("agent_end", (event, ctx) => {
    ctx.agent.message(`## Post-Edit Quality Gate

After completing any code modification, silently verify:

1. Did I introduce any \`any\` types? If yes, fix them.
2. Did I leave any console.log or debugger statements? If yes, remove them.
3. Did I add any AI attribution comments, headers, or co-author tags? If yes, remove them.
4. Are all useEffect dependency arrays correct and complete?

If any violations found, fix them silently before presenting the result.`);
  });
}
