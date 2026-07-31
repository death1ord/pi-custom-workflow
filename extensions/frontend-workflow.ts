/**
 * Frontend Dev Workflow Extension for Pi Coding Agent
 *
 * Registers slash commands that orchestrate the full frontend development
 * lifecycle: planning, scaffolding, TDD, refactoring, linting, and review.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // ─────────────────────────────────────────────────────────
  // /plan — Interactive feature planning & specification
  // ─────────────────────────────────────────────────────────
  pi.registerCommand("plan", {
    description:
      "Start an interactive planning session for a new feature or refactor. " +
      "Produces a technical specification with component tree, types, hooks, " +
      "tests list, and acceptance criteria before any code is written.",
    handler: async (_args, ctx) => {
      ctx.agent.message(`You are now in PLANNING MODE. Follow this exact process:

## Planning Protocol

1. **Gather Requirements**
   - Ask the developer 3-5 clarifying questions about scope, edge cases, and constraints.
   - Read relevant existing components, hooks, and types to understand current patterns.

2. **Produce Specification**
   Write a structured plan covering:
   - Component tree diagram (parent → children)
   - TypeScript interfaces for all new/modified props and state
   - Custom hooks to create or modify
   - API contracts (request/response shapes)
   - List of test cases (unit + integration) to write FIRST
   - Acceptance criteria checklist

3. **Get Approval**
   - Present the plan to the developer.
   - Do NOT write any implementation code until the developer approves.

4. **Stealth Check**
   - Ensure the plan contains no AI attribution or metadata.

BEGIN by reading the relevant source files and asking your clarifying questions.`);
    },
  });

  // ─────────────────────────────────────────────────────────
  // /tdd — Test-Driven Development cycle
  // ─────────────────────────────────────────────────────────
  pi.registerCommand("tdd", {
    description:
      "Execute a strict TDD cycle: write a failing test first, " +
      "implement minimal code to pass, then refactor.",
    handler: async (_args, ctx) => {
      ctx.agent.message(`You are now in TDD MODE. Follow this exact loop:

## TDD Execution Loop

### Step 1: Characterize (if touching existing code)
- Write characterization tests that assert current working behavior.
- Run tests: \`npx vitest run\` or \`npm test\`
- Confirm all characterization tests PASS (this is your safety net).

### Step 2: 🔴 RED — Write a Failing Test
- Create or update the test file (\`*.test.tsx\` / \`*.test.ts\`).
- Write a test asserting the desired NEW behavior or fix.
- Run tests and confirm the new test FAILS with a clear assertion error.
- Show the developer the failing test output.

### Step 3: 🟢 GREEN — Minimal Implementation
- Write the MINIMUM code needed to make the failing test pass.
- Do NOT add extra features, optimizations, or speculative code.
- Run tests and confirm ALL tests PASS (including characterization tests).

### Step 4: 🔵 REFACTOR — Clean & Improve
- Extract custom hooks, decompose large components, add strict TypeScript types.
- Eliminate code smells: prop drilling, useEffect abuse, any types, inline objects.
- Run tests AGAIN to confirm nothing broke.

### Step 5: Verify
- Run full suite: \`npm test\`
- Run linter: \`npm run lint\`
- Run type check: \`npx tsc --noEmit\`
- Report results to the developer.

REPEAT this loop for each vertical slice of the feature.

IMPORTANT: Do NOT commit. Suggest commit commands for the developer to run.

BEGIN by asking what component, feature, or bug fix to target.`);
    },
  });

  // ─────────────────────────────────────────────────────────
  // /scaffold — Generate component boilerplate
  // ─────────────────────────────────────────────────────────
  pi.registerCommand("scaffold", {
    description:
      "Scaffold a new React component with TypeScript types, test file, " +
      "optional custom hook, and story/demo file.",
    handler: async (_args, ctx) => {
      ctx.agent.message(`You are now in SCAFFOLD MODE.

## Scaffolding Protocol

1. Ask the developer for:
   - Component name (PascalCase)
   - Purpose / short description
   - Parent directory (e.g., src/components/, src/features/)
   - Whether it needs: custom hook, tests, CSS module

2. Read the existing project structure to match conventions:
   - File naming (kebab-case vs PascalCase directories)
   - Export style (named vs default, barrel index.ts files)
   - Styling approach (CSS Modules, Tailwind, styled-components)
   - Test file location (co-located vs __tests__ directory)

3. Generate these files:
   - \`ComponentName.tsx\` — typed functional component with explicit prop interface
   - \`ComponentName.test.tsx\` — skeleton test with RTL render and a11y assertions
   - \`useComponentName.ts\` — custom hook (if requested)
   - \`ComponentName.module.css\` or equivalent (if using CSS Modules)
   - Update barrel \`index.ts\` if one exists

4. Stealth: No AI comments, no "generated by" headers.

BEGIN by asking for component details.`);
    },
  });

  // ─────────────────────────────────────────────────────────
  // /audit — Codebase quality audit
  // ─────────────────────────────────────────────────────────
  pi.registerCommand("audit", {
    description:
      "Run a comprehensive code quality audit on the React codebase: " +
      "type safety, component architecture, test coverage gaps, " +
      "performance anti-patterns, and accessibility issues.",
    handler: async (_args, ctx) => {
      ctx.agent.message(`You are now in AUDIT MODE.

## Codebase Audit Protocol

Scan the codebase and generate a structured report covering these categories:

### 1. 🔴 Type Safety
- Files using \`any\` type
- Untyped component props
- Missing return types on functions/hooks
- .js/.jsx files that should be .ts/.tsx

### 2. 🟠 Component Architecture
- God components (>200 lines)
- Prop drilling chains (>3 levels)
- Components mixing concerns (fetching + rendering + state)
- Missing custom hook extractions

### 3. 🟡 Performance Anti-Patterns
- Inline object/array/function creation in JSX props
- Missing React.memo on pure child components
- Missing useMemo/useCallback where beneficial
- Large bundles without code splitting (React.lazy)

### 4. 🔵 Test Coverage Gaps
- Components/hooks without test files
- Test files with no assertions
- Missing error/edge-case test scenarios

### 5. 🟢 Accessibility (a11y)
- Non-semantic HTML (div instead of button, nav, main)
- Missing ARIA attributes on interactive widgets
- Images without alt text
- Non-keyboard-accessible elements

### Output Format
Present findings as a markdown table per category with:
| File | Issue | Severity | Suggested Fix |

BEGIN by scanning the src/ directory.`);
    },
  });

  // ─────────────────────────────────────────────────────────
  // /refactor — Deep refactoring session
  // ─────────────────────────────────────────────────────────
  pi.registerCommand("refactor", {
    description:
      "Start a guided refactoring session on a specific file or module. " +
      "Writes safety-net tests first, then transforms the code.",
    handler: async (_args, ctx) => {
      ctx.agent.message(`You are now in REFACTOR MODE.

## Refactoring Protocol

1. **Target Identification**
   - Ask the developer which file/module/component to refactor.
   - Read the file completely. Identify all code smells.

2. **Safety Net (Characterization Tests)**
   - Before modifying ANY production code, write tests that capture current behavior.
   - Run tests to confirm they all PASS.

3. **Refactoring Transformations** (apply as needed):
   - **Extract Hook**: Move useState/useEffect/fetch logic into \`useXxx.ts\`
   - **Decompose Component**: Split >150-line components into sub-components
   - **Strict Types**: Replace \`any\` with explicit interfaces/unions
   - **Fix useEffect**: Remove derived state effects, add cleanup, fix deps
   - **Eliminate Prop Drilling**: Introduce Context or Zustand store
   - **Memoize**: Add useMemo/useCallback/React.memo where beneficial
   - **Remove DOM Mutation**: Replace document.getElementById with useRef + state

4. **Verify**
   - Run full test suite.
   - Run linter and type checker.
   - Show diff summary to the developer.

5. **Stealth**: No AI comments. No auto-commits.

BEGIN by asking which file to refactor.`);
    },
  });

  // ─────────────────────────────────────────────────────────
  // /review — Pre-commit code review
  // ─────────────────────────────────────────────────────────
  pi.registerCommand("review", {
    description:
      "Review staged or unstaged git changes before committing. " +
      "Checks for bugs, type issues, test gaps, and stealth compliance.",
    handler: async (_args, ctx) => {
      ctx.agent.message(`You are now in REVIEW MODE.

## Pre-Commit Review Protocol

1. **Inspect Changes**
   - Run \`git diff\` (unstaged) and \`git diff --staged\` (staged).
   - Read every modified file completely.

2. **Review Checklist**
   - [ ] No \`any\` types introduced
   - [ ] All new functions have explicit return types
   - [ ] New components have corresponding test files
   - [ ] useEffect hooks have correct dependency arrays and cleanup
   - [ ] No inline object/array creation in JSX props causing re-renders
   - [ ] Semantic HTML and ARIA attributes for new interactive elements
   - [ ] No console.log or debugger statements left in
   - [ ] No AI attribution, co-author tags, or bot signatures anywhere

3. **Test Verification**
   - Run \`npm test\` to confirm all tests pass.
   - Run \`npx tsc --noEmit\` for type safety.
   - Run \`npm run lint\` for code style.

4. **Suggest Commit**
   If all checks pass, suggest a clean conventional commit message:
   \`\`\`bash
   git add <files>
   git commit -m "type(scope): concise description"
   \`\`\`

   Do NOT execute the commit. Present it for the developer to run.

BEGIN by running git diff.`);
    },
  });

  // ─────────────────────────────────────────────────────────
  // /diagnose — Systematic bug investigation
  // ─────────────────────────────────────────────────────────
  pi.registerCommand("diagnose", {
    description:
      "Systematically investigate and diagnose a bug. " +
      "Reproduce → isolate → root-cause → fix with TDD.",
    handler: async (_args, ctx) => {
      ctx.agent.message(`You are now in DIAGNOSE MODE.

## Bug Diagnosis Protocol

### Phase 1: Symptom Collection
- Ask the developer to describe the bug (expected vs actual behavior).
- Read relevant error logs, stack traces, and browser console output.
- Identify affected files, components, and data flow paths.

### Phase 2: Reproduction
- Write a minimal failing test that reproduces the bug consistently.
- Run the test and confirm it fails for the EXACT symptom described.

### Phase 3: Root Cause Analysis
- Trace the data/state flow through the component tree.
- Check for: race conditions, stale closures, null/undefined access,
  incorrect useEffect dependencies, mutated state, incorrect API contracts.
- Formulate a single, empirically verified hypothesis.

### Phase 4: Fix (TDD)
- The failing reproduction test IS your Red phase test.
- Write the minimal fix to make it pass (Green).
- Refactor if the fix reveals deeper structural issues.
- Run full test suite to confirm no regressions.

### Phase 5: Report
- Summarize: symptom → root cause → fix applied → tests added.

BEGIN by asking the developer to describe the bug.`);
    },
  });

  // ─────────────────────────────────────────────────────────
  // /perf — Performance optimization session
  // ─────────────────────────────────────────────────────────
  pi.registerCommand("perf", {
    description:
      "Analyze and optimize React component performance: " +
      "re-render reduction, bundle splitting, virtualization.",
    handler: async (_args, ctx) => {
      ctx.agent.message(`You are now in PERFORMANCE MODE.

## Performance Optimization Protocol

1. **Identify Hot Spots**
   - Ask which page/component feels slow or re-renders too often.
   - Read the component tree and identify render triggers.

2. **Re-render Analysis**
   - Trace prop reference changes causing unnecessary re-renders.
   - Identify inline objects/arrays/functions in JSX props.
   - Find missing React.memo boundaries.

3. **Optimization Techniques** (apply as needed):
   - Wrap pure child components in \`React.memo\`
   - Extract stable callbacks with \`useCallback\`
   - Memoize expensive computations with \`useMemo\`
   - Add code splitting with \`React.lazy\` + \`Suspense\`
   - Virtualize long lists with \`@tanstack/react-virtual\`
   - Debounce rapid input handlers
   - Move derived state out of useEffect into direct calculation

4. **Verify**
   - Run tests to confirm no regressions.
   - Describe the performance improvement to the developer.

BEGIN by asking which component to optimize.`);
    },
  });
}
