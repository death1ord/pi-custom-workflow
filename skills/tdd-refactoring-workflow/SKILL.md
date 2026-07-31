---
name: tdd-refactoring-workflow
description: Systematic Test-Driven Development (TDD) workflow for refactoring low-quality legacy React codebases safely without breaking existing features.
---

# Comprehensive TDD & Refactoring Workflow Skill

This skill enforces a strict, disciplined Test-Driven Development (TDD) cycle when dealing with low-quality, fragile, or legacy React/TypeScript code.

---

## 🔄 The 5-Phase TDD Refactoring Cycle

```
  ┌─────────────────────────────────────────────────────────┐
  │ 1. CHARACTERIZE  ➔  Write tests capturing existing code  │
  └────────────────────────────┬────────────────────────────┘
                               │
  ┌────────────────────────────▼────────────────────────────┐
  │ 2. RED PHASE     ➔  Write failing test for target change│
  └────────────────────────────┬────────────────────────────┘
                               │
  ┌────────────────────────────▼────────────────────────────┐
  │ 3. GREEN PHASE   ➔  Pass test with minimal implementation│
  └────────────────────────────┬────────────────────────────┘
                               │
  ┌────────────────────────────▼────────────────────────────┐
  │ 4. REFACTOR      ➔  Clean component architecture & TS   │
  └────────────────────────────┬────────────────────────────┘
                               │
  ┌────────────────────────────▼────────────────────────────┐
  │ 5. VERIFY        ➔  Run full test suite & linter        │
  └─────────────────────────────────────────────────────────┘
```

---

## Phase 1: Characterization Testing (Safety Net for Bad Code)
Before modifying messy or untested legacy code:
1. **Do not refactor blindly**: Inspect the component logic and identify core requirements.
2. **Write Characterization Tests**: Create integration tests using Vitest/React Testing Library that assert current working behavior.
   ```tsx
   // Example: Characterization test securing legacy user dashboard behavior
   test('legacy dashboard renders user stats and handles tab switches', async () => {
     render(<LegacyDashboard userId="usr-123" />);
     expect(screen.getByText(/User Stats/i)).toBeInPlace();
     await userEvent.click(screen.getByRole('button', { name: /Activity/i }));
     expect(screen.getByRole('heading', { name: /Activity Log/i })).toBeVisible();
   });
   ```
3. Run `npm test` to confirm characterization tests pass, establishing a reliable baseline.

---

## Phase 2: Red Phase (Write Failing Tests)
1. Identify the bug to fix, feature to add, or structural component contract to improve.
2. Write a unit or integration test that asserts the desired clean behavior.
3. Run tests (`npx vitest run`) and confirm the test **fails for the expected reason** (Red state).

---

## Phase 3: Green Phase (Make it Pass)
1. Write the minimal necessary implementation in the React component or hook to pass the test.
2. Avoid premature optimization in this phase; focus solely on getting to a **Green** passing state quickly.
3. Confirm all tests in the test file pass.

---

## Phase 4: Refactor Phase (Code Quality Transformation)
With tests passing safely, execute deep code cleanup:
1. **Decompose Giant Components**: Break down 500+ line components into sub-components under 100 lines.
2. **Extract Custom Hooks**: Move `useState`, `useEffect`, data fetching, and event handler logic into custom hooks (`useDashboardData`, `useFormValidation`).
3. **Strict TypeScript Types**: Replace `any`, `object`, or loose types with explicit `interface` / `type` definitions and discriminated unions.
4. **Remove Anti-Patterns**: Eliminate state mutation, redundant state, missing `useEffect` dependencies, and race conditions.
5. **Optimize Re-renders**: Wrap sub-components in `React.memo` where beneficial and memoize heavy callbacks with `useCallback`.

---

## Phase 5: Verification & Cleanliness Check
1. Run full project test suite (`npm test`).
2. Run linter (`npm run lint`).
3. Run TypeScript type checker (`npx tsc --noEmit`).
4. Ensure code formatting is clean and adheres to repository conventions.
5. Verify **ZERO** AI disclaimers or `Co-authored-by` lines were introduced.
