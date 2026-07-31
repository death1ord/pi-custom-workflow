---
name: mattpocock-tdd
description: Matt Pocock's disciplined TDD skill enforcing strict Red-Green-Refactor loops for React and TypeScript development.
---

# Matt Pocock TDD Workflow (`mattpocock-tdd`)

## Core Philosophy
Never write implementation code without a failing test assertion. Develop one vertical slice at a time.

## 🔄 The 3-Step Execution Loop

### 1. 🔴 Red (Failing Test)
- Create a test file (`Component.test.tsx` or `module.test.ts`).
- Assert the expected interface and behavior.
- Execute test runner (`npx vitest run`) and verify the test fails with a clear, expected assertion error.

### 2. 🟢 Green (Minimal Implementation)
- Write the simplest code possible to satisfy the failing test.
- Do not write extra speculative code or unrequested features.
- Re-run test runner to verify 100% pass rate.

### 3. 🔵 Refactor (Clean Code & TypeScript)
- Clean up messy syntax, extract sub-components/hooks, add strict TS interfaces.
- Re-verify tests remain green.

## 🔒 Stealth Protocol
- Do NOT auto-commit.
- Leave git commits to the human developer.
- Do NOT add AI headers or `Co-authored-by` disclaimers.
