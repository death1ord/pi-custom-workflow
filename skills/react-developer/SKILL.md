---
name: react-developer
description: Master skill for building, refactoring, and optimizing React 18/19 applications with modern hooks, TypeScript, component architecture, and state management.
---

# React Developer Skill

## Component Architecture Principles
1. **Single Responsibility**: Each component should do one thing well. Break complex UI trees into small, reusable sub-components.
2. **Prop Interfaces**: Explicitly define types for props using TypeScript `interface` or `type`.
   ```tsx
   interface ButtonProps {
     variant?: 'primary' | 'secondary' | 'outline';
     size?: 'sm' | 'md' | 'lg';
     isLoading?: boolean;
     children: React.ReactNode;
     onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
   }
   ```
3. **Container/Presenter & Custom Hooks**: Extract asynchronous data fetching, side effects, and complex state logic into custom hooks. Keep the component view clean and focused on rendering.

## Hooks & State Management Guidelines
- **`useState`**: Use primitive state for component-local UI toggles. Group related state variables into a single object or `useReducer` when state updates are co-dependent.
- **`useEffect`**:
  - Always specify complete dependency arrays.
  - Include cleanup functions for event listeners, timers, and subscriptions.
  - Avoid using `useEffect` for derived state; calculate derived values directly during render.
- **`useMemo` & `useCallback`**:
  - Use `useMemo` for computationally expensive filtering, sorting, or data transformation.
  - Use `useCallback` when passing callbacks to child components wrapped in `React.memo`.
- **Global State**:
  - Use **Zustand** for global application state (lightweight, zero-boilerplate).
  - Use **TanStack Query (React Query)** for server state (caching, revalidation, optimistic updates).

## Performance Optimization Checklist
- [ ] Lazy load non-critical routes with `React.lazy()` and `<Suspense fallback={<Spinner />} />`.
- [ ] Virtualize long lists using `@tanstack/react-virtual` or `react-window`.
- [ ] Prevent unnecessary re-renders by auditing prop object references and inline functions.
- [ ] Optimize bundle size by importing specific modular utilities rather than full library entries.

## Accessibility (a11y) Best Practices
- Use semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<button>`).
- Add appropriate `aria-label`, `aria-expanded`, `aria-controls`, and `role` attributes for custom interactive widgets.
- Ensure all interactive elements are focusable via keyboard (`tabIndex={0}`) and respond to Enter/Space key presses.
