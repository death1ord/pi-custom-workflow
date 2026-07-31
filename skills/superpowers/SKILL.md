---
name: superpowers
description: Supercharged planning methodology featuring multi-option architectural brainstorming, Architectural Decision Records (ADRs), and atomic task decomposition prior to coding.
---

# Superpowers Planning Skill

This skill enforces a high-discipline, structured architectural planning phase before any code modifications or additions are made.

---

## 🔄 The Superpowers Planning Loop

```
  ┌──────────────────────────────────────────────────────────┐
  │ 1. BRAINSTORM   ➔ Describe 3 different design approaches │
  └────────────────────────────┬─────────────────────────────┘
                               │
  ┌────────────────────────────▼─────────────────────────────┐
  │ 2. DRAFT ADR    ➔ Select best option & document trade-offs│
  └────────────────────────────┬─────────────────────────────┘
                               │
  ┌────────────────────────────▼─────────────────────────────┐
  │ 3. DECOMPOSE    ➔ Break down plan into atomic task list  │
  └────────────────────────────┬─────────────────────────────┘
                               │
  ┌────────────────────────────▼─────────────────────────────┐
  │ 4. EXECUTE      ➔ Implement step-by-step using TDD       │
  └──────────────────────────────────────────────────────────┘
```

---

## Step 1: Brainstorming (Three Paths)
When presented with a task, write down exactly **three** potential implementation paths:
1. **Option A (Minimalist/Direct)**: The fastest, lowest-complexity path. High speed, minimal modification.
2. **Option B (Robust/Standard)**: The standard best-practice path. Balanced, modular, and maintainable.
3. **Option C (Scalable/Advanced)**: High-flexibility path. Handles edge cases, performance considerations, and future extensions.

*For each option, document:*
- High-level design summary.
- Pros (advantages).
- Cons (downsides/trade-offs).

---

## Step 2: Draft the Architectural Decision Record (ADR)
From the three options, select the best fit for the project and state:
- **Decision**: "We will implement Option X because..."
- **Consequences**: List any side effects, dependencies, database schema changes, or UI rendering trade-offs that result from this choice.

---

## Step 3: Task Decomposition
Break the selected option into a checklist of **independent, atomic, and testable sub-tasks**.
- Keep tasks small (no task should modify more than 2-3 files).
- Explicitly state how each task will be tested/verified.
- **Example Decomposition List**:
  - [ ] 1. Create interface types in `types/` (Verify: `tsc --noEmit`).
  - [ ] 2. Write failing test for hook `useUserData` (Verify: `npm test` fails).
  - [ ] 3. Implement hook logic (Verify: `npm test` passes).
  - [ ] 4. Connect hook to component (Verify: RTL render test passes).

---

## Step 4: Step-by-Step Execution (TDD Integration)
Proceed to execute the checklist task-by-task.
- Do not write code for Task 2 until Task 1 is completely implemented and verified.
- Run tests (`npm test` or `npx vitest run`) and typechecks after completing each item.
