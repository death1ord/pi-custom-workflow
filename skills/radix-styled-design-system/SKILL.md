---
name: radix-styled-design-system
description: Patterns for building a custom design system by composing Radix UI primitives with styled-components theming, variant systems, and accessible interactive components.
---

# Radix + Styled-Components Design System Skill

## Building a Custom Design System

### Pattern: Wrap Radix Primitives into Project-Specific Components
Never use raw Radix components in feature code. Create project-level wrappers:

```tsx
// components/ui/Button.tsx
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = styled.button<ButtonProps>`...`;
```

```tsx
// components/ui/Dialog.tsx
import * as RadixDialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

// Re-export as project components
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogOverlay = styled(RadixDialog.Overlay)`...`;
export const DialogContent = styled(RadixDialog.Content)`...`;
export const DialogTitle = styled(RadixDialog.Title)`...`;
export const DialogDescription = styled(RadixDialog.Description)`...`;
export const DialogClose = RadixDialog.Close;
```

### Pattern: Compound Components with Radix
```tsx
// components/ui/Dropdown.tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

export const Menu = DropdownMenu.Root;
export const MenuTrigger = DropdownMenu.Trigger;
export const MenuContent = styled(DropdownMenu.Content)`
  min-width: 200px;
  background: ${({ theme }) => theme.colors.popover};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space[1]};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
`;
export const MenuItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  outline: none;

  &[data-highlighted] {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentText};
  }

  &[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;
export const MenuSeparator = styled(DropdownMenu.Separator)`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.space[1]} 0;
`;
```

---

## File Organization Convention
```
src/
├── components/
│   ├── ui/              ← Design system primitives (Radix + styled wrappers)
│   │   ├── Button.tsx
│   │   ├── Dialog.tsx
│   │   ├── Select.tsx
│   │   ├── Tabs.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Input.tsx
│   │   └── index.ts     ← Barrel export
│   └── features/        ← Feature-specific components using ui/ primitives
├── styles/
│   ├── theme.ts          ← Theme definition
│   ├── styled.d.ts       ← DefaultTheme type augmentation
│   └── GlobalStyles.ts   ← Global CSS reset & base styles
```

---

## Key Rules
1. **All Radix primitives must be wrapped** in styled-components before use in feature code.
2. **Use `data-*` attribute selectors** for Radix states — never classList manipulation.
3. **All theme tokens accessed via `${({ theme }) => theme.xxx}`** — no hardcoded colors, spacing, or shadows.
4. **Test accessibility**: Verify keyboard navigation, focus management, and screen reader announcements for every Radix component wrapper.
5. **Animation**: Use CSS `@keyframes` on Radix `[data-state="open"]` / `[data-state="closed"]` for enter/exit animations.
