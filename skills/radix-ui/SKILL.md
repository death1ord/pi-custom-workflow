---
name: radix-ui
description: Comprehensive guide for building accessible, composable UI with Radix UI primitives and custom styling via styled-components.
---

# Radix UI Primitives Skill

## Core Philosophy
Radix provides **unstyled, accessible, composable** primitives. We control 100% of the visual design via styled-components. Never fight Radix's accessibility defaults — extend them.

---

## Component Patterns

### 1. Dialog / Modal
```tsx
import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  animation: overlayFadeIn 200ms ease-out;

  @keyframes overlayFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[6]};
  box-shadow: ${({ theme }) => theme.shadows.elevated};
  max-width: 520px;
  width: 90vw;
  animation: contentSlideIn 250ms ease-out;

  @keyframes contentSlideIn {
    from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }

  &:focus { outline: none; }
`;
```

### 2. Select / Dropdown
```tsx
import * as Select from '@radix-ui/react-select';
import styled from 'styled-components';

const Trigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  background: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  gap: ${({ theme }) => theme.space[2]};
  cursor: pointer;

  &[data-placeholder] { color: ${({ theme }) => theme.colors.textMuted}; }
  &:focus { outline: 2px solid ${({ theme }) => theme.colors.focusRing}; }
`;

const SelectContent = styled(Select.Content)`
  background: ${({ theme }) => theme.colors.popover};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  overflow: hidden;
  z-index: 50;
`;

const SelectItem = styled(Select.Item)`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  cursor: pointer;
  outline: none;

  &[data-highlighted] {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentText};
  }
`;
```

### 3. Tooltip
```tsx
import * as Tooltip from '@radix-ui/react-tooltip';
import styled from 'styled-components';

const TooltipContent = styled(Tooltip.Content)`
  background: ${({ theme }) => theme.colors.tooltipBg};
  color: ${({ theme }) => theme.colors.tooltipText};
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  animation: tooltipFadeIn 150ms ease-out;

  @keyframes tooltipFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;
```

### 4. Tabs
```tsx
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';

const TabsList = styled(Tabs.List)`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.space[1]};
`;

const TabsTrigger = styled(Tabs.Trigger)`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 150ms, border-color 150ms;

  &[data-state="active"] {
    color: ${({ theme }) => theme.colors.text};
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover { color: ${({ theme }) => theme.colors.text}; }
`;
```

---

## Key Rules
1. **Always use Radix data attributes** for styling states: `[data-state="open"]`, `[data-state="active"]`, `[data-highlighted]`, `[data-disabled]`, `[data-placeholder]`.
2. **Never override Radix accessibility**: Don't remove `role`, `aria-*`, or keyboard handlers that Radix provides.
3. **Use `asChild` prop** when you need to render a Radix trigger as a custom styled-component without an extra DOM wrapper.
4. **Wrap the app** in `<Tooltip.Provider delayDuration={300}>` for consistent tooltip behavior.
5. **Portal usage**: Use Radix's built-in `Portal` sub-components (e.g., `Dialog.Portal`, `Select.Portal`) for proper stacking context.
