---
name: typescript-expert
description: Advanced TypeScript patterns, strict type safety, generic utilities, and clean type design for React and Node.js applications.
---

# TypeScript Expert Skill

## Strict Type Safety Standard
1. **No `any` Types**: Use `unknown` when the type is unknown, and narrow with type guards or `zod` schemas.
2. **Strict Null Checks**: Always handle `null` and `undefined` safely using optional chaining (`?.`) and nullish coalescing (`??`).
3. **Immutability**: Use `readonly` arrays and properties where data should not be mutated.

## React Type Patterns
- **Event Handler Types**:
  - `React.ChangeEvent<HTMLInputElement>`
  - `React.FormEvent<HTMLFormElement>`
  - `React.KeyboardEvent<HTMLElement>`
- **Ref Types**:
  - `React.RefObject<HTMLInputElement>` for DOM element refs.
- **Generic Components**:
  ```tsx
  interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string | number;
  }

  export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
    return (
      <ul>
        {items.map((item) => (
          <li key={keyExtractor(item)}>{renderItem(item)}</li>
        ))}
      </ul>
    );
  }
  ```

## Utility Types Reference
- `Partial<T>`, `Required<T>`, `Readonly<T>`
- `Pick<T, K>`, `Omit<T, K>`
- `Record<K, T>`
- `ReturnType<T>`, `Parameters<T>`
