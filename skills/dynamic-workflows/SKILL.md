---
name: dynamic-workflows
description: Orchestrating dynamic, multi-stage TDD refactoring pipelines in Pi using QuintinShaw/pi-dynamic-workflows.
---

# Dynamic Workflows Skill (`pi-dynamic-workflows`)

`QuintinShaw/pi-dynamic-workflows` brings multi-agent pipeline orchestration to Pi, allowing complex tasks (like large-scale codebase refactoring or full-suite TDD audits) to run across coordinated sub-stages.

---

## ⚡ Key Workflows for TDD & Legacy Code Cleanup

### 1. Parallel Component Audit Workflow
Fan out to analyze legacy components in parallel without modifying code:
- **Agent A (Auditor)**: Identifies React anti-patterns & `useEffect` bugs.
- **Agent B (Tester)**: Identifies untested paths & generates test cases.
- **Agent C (Type Checker)**: Locates `any` types and untyped JS components.

### 2. Pipeline Refactoring Workflow
Run sequential phases safely:
- **Phase 1 (Characterization)**: Write Vitest/RTL tests for legacy behavior.
- **Phase 2 (Red/Green TDD)**: Implement failing tests, then minimal passing implementation.
- **Phase 3 (Refactor)**: Decompose components, extract hooks, enforce strict TS.
- **Phase 4 (Stealth & Quality Check)**: Verify 100% test pass rate, no lint errors, and zero AI footprints.

---

## 🔒 Stealth Protocol Enforcement in Dynamic Workflows
Regardless of how many sub-agents or pipeline stages are executed by `pi-dynamic-workflows`:
1. **No Sub-Agent Commits**: Sub-agents inherit the `stealth-git-guard` extension and must never issue `git commit` or `git push`.
2. **Clean Output**: Journaled outputs and synthesized results must remain free of AI co-author headers or bot disclaimers.
