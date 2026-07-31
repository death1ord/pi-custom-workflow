---
name: styled-components
description: Styled-components patterns, theming architecture, dynamic styling, and performance best practices for React applications.
---

# Styled-Components Skill

## Theme Architecture

### 1. Define a Strongly-Typed Theme
```tsx
// theme.ts
export const theme = {
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    surface: '#ffffff',
    surfaceElevated: '#f8fafc',
    background: '#f1f5f9',
    text: '#0f172a',
    textMuted: '#64748b',
    border: '#e2e8f0',
    input: '#ffffff',
    focusRing: '#818cf8',
    accent: '#6366f1',
    accentText: '#ffffff',
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    popover: '#ffffff',
    tooltipBg: '#1e293b',
    tooltipText: '#f8fafc',
  },
  space: ['0', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '2rem', '3rem', '4rem'],
  radii: { sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
  fontSizes: { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem' },
  fontWeights: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1)',
    elevated: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
    dropdown: '0 10px 38px -10px rgba(0,0,0,0.35), 0 10px 20px -15px rgba(0,0,0,0.2)',
  },
  transitions: { fast: '150ms ease', normal: '200ms ease', slow: '300ms ease' },
} as const;

export type AppTheme = typeof theme;
```

### 2. TypeScript Integration with DefaultTheme
```tsx
// styled.d.ts
import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
```

### 3. ThemeProvider Setup
```tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* app content */}
    </ThemeProvider>
  );
}
```

---

## Styling Patterns

### Dynamic Props (Variants)
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: background ${({ theme }) => theme.transitions.fast};

  /* Size variants */
  padding: ${({ size = 'md', theme }) => ({
    sm: `${theme.space[1]} ${theme.space[2]}`,
    md: `${theme.space[2]} ${theme.space[4]}`,
    lg: `${theme.space[3]} ${theme.space[5]}`,
  }[size])};

  font-size: ${({ size = 'md', theme }) => ({
    sm: theme.fontSizes.sm,
    md: theme.fontSizes.md,
    lg: theme.fontSizes.lg,
  }[size])};

  /* Color variants */
  background: ${({ variant = 'primary', theme }) => ({
    primary: theme.colors.primary,
    secondary: theme.colors.surfaceElevated,
    ghost: 'transparent',
  }[variant])};

  color: ${({ variant = 'primary', theme }) => ({
    primary: '#fff',
    secondary: theme.colors.text,
    ghost: theme.colors.text,
  }[variant])};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
```

### Composing with Radix
```tsx
import * as Dialog from '@radix-ui/react-dialog';

// Use styled() to wrap Radix components directly
const StyledOverlay = styled(Dialog.Overlay)`...`;
const StyledContent = styled(Dialog.Content)`...`;

// Or use asChild to merge with existing styled-component
<Dialog.Trigger asChild>
  <Button variant="primary">Open</Button>
</Dialog.Trigger>
```

### Global Styles
```tsx
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }
`;
```

---

## Performance Rules
1. **Define styled components OUTSIDE React components** — never inside render functions.
2. **Avoid excessive interpolations** — prefer CSS custom properties for dynamic values that change frequently (hover, active states).
3. **Use `attrs` for frequently changing props** to avoid generating new class names:
   ```tsx
   const ProgressBar = styled.div.attrs<{ percent: number }>(({ percent }) => ({
     style: { width: `${percent}%` },
   }))<{ percent: number }>`
     height: 4px;
     background: ${({ theme }) => theme.colors.primary};
     transition: width ${({ theme }) => theme.transitions.normal};
   `;
   ```
4. **Use `css` helper** for shared style fragments:
   ```tsx
   import { css } from 'styled-components';

   const truncate = css`
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
   `;
   ```
