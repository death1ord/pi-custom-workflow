---
name: react-code-smells-fixer
description: Catalog of low-quality React anti-patterns, code smells, and exact step-by-step refactoring recipes to transform bad code into high-quality TypeScript/React.
---

# React Code Smells & Refactoring Guide

## 🚨 Smell 1: The "God Component" (Bloated 500+ Line Files)
- **Symptom**: Single file containing JSX, state, API calls, inline CSS, sub-render helpers (`renderHeader()`), and event handlers.
- **Fix Recipe**:
  1. Extract API calls & state into custom hooks (`useFeatureData()`).
  2. Split JSX sub-trees into independent, typed sub-components (`<FeatureHeader>`, `<FeatureTable>`, `<FeatureFooter>`).
  3. Keep the root component purely as an orchestrator under 80 lines.

---

## 🚨 Smell 2: `useEffect` Abuse & Missing Dependencies
- **Symptom**:
  - `useEffect` fetching data without cleanup (susceptible to race conditions).
  - Storing derived state in `useEffect` (e.g. `useEffect(() => setFullName(firstName + ' ' + lastName), [firstName, lastName])`).
- **Fix Recipe**:
  - **Derived State**: Calculate directly in render:
    ```tsx
    // BAD:
    const [fullName, setFullName] = useState('');
    useEffect(() => { setFullName(`${firstName} ${lastName}`); }, [firstName, lastName]);

    // GOOD:
    const fullName = `${firstName} ${lastName}`;
    ```
  - **Async Data Fetching**: Add `ignore` flag cleanup or migrate to TanStack Query (React Query):
    ```tsx
    useEffect(() => {
      let isMounted = true;
      fetchUser(id).then(data => {
        if (isMounted) setUser(data);
      });
      return () => { isMounted = false; };
    }, [id]);
    ```

---

## 🚨 Smell 3: Untyped Props & `any` Type Leakage
- **Symptom**: Props typed as `any`, `object`, or component written in plain `.js`/`.jsx` with prop-types missing.
- **Fix Recipe**:
  1. Convert file extension from `.js`/`.jsx` to `.ts`/`.tsx`.
  2. Create explicit prop types:
     ```tsx
     interface UserCardProps {
       user: {
         id: string;
         name: string;
         email: string;
         status: 'active' | 'inactive' | 'pending';
       };
       onSelect?: (id: string) => void;
     }
     ```

---

## 🚨 Smell 4: Prop Drilling (Passing props 4+ levels down)
- **Symptom**: Middle components taking props they don't use just to pass them to deep children.
- **Fix Recipe**:
  1. Use Component Composition (`children` prop) to elevate rendering to parent level.
  2. For app-wide state (theme, user session), create a React Context or Zustand store.

---

## 🚨 Smell 5: Inline Object/Array Instantiation in JSX Props
- **Symptom**: `<Child style={{ color: 'red' }} options={['a', 'b']} onClick={() => doSomething()} />` creating fresh references on every render.
- **Fix Recipe**:
  1. Extract static options/styles outside the component scope.
  2. Wrap dynamic callbacks in `useCallback`.
  3. Wrap computed arrays/objects in `useMemo`.

---

## 🚨 Smell 6: Direct DOM Mutation & Untyped `document.getElementById`
- **Symptom**: Imperative DOM manipulation inside React components (`document.getElementById('my-btn').style.display = 'none'`).
- **Fix Recipe**: Replace imperative DOM calls with React state (`useState`), refs (`useRef`), or declarative class names/styles.
