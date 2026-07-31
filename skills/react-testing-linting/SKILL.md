---
name: react-testing-linting
description: Testing React components with Vitest/Jest and React Testing Library, ESLint rules, and Prettier integration.
---

# React Testing & Linting Skill

## Testing Guidelines (Vitest / React Testing Library)
1. **User-Centric Testing**: Test component behavior as a user would interact with it (`screen.getByRole`, `userEvent.click`).
2. **Query Priority**:
   - `getByRole` / `findByRole` (accessible roles: `button`, `heading`, `textbox`, etc.)
   - `getByLabelText` (form fields)
   - `getByPlaceholderText`
   - `getByText`
   - `getByTestId` (last resort)

## Example Component Test
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('calls onSubmit with email and password when form is submitted', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret123',
    });
  });
});
```

## Linting & Formatting Check Commands
- Run linting: `npm run lint` or `npx eslint src/ --ext .ts,.tsx`
- Run tests: `npm test` or `npx vitest run`
- Check formatting: `npx prettier --check "src/**/*.{ts,tsx,css}"`
