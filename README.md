# Pi Coding Agent — React Frontend Development Suite

A comprehensive, stealth-enabled configuration for the [Pi coding agent](https://pi.dev) providing an **end-to-end frontend development workflow** via custom extensions, slash commands, and skills.

Optimized for **React 18/19 + TypeScript + Radix UI + styled-components** projects with TDD, refactoring, code auditing, and performance optimization built in.

---

## 🚀 One-Command Install

### Clone and install on any machine:

**Windows (Command Prompt — no admin required):**
```cmd
git clone <your-repo-url> C:\pi-agent-suite
cd C:\pi-agent-suite
install.bat
```

**macOS / Linux / Git Bash:**
```bash
git clone <your-repo-url> ~/pi-agent-suite
cd ~/pi-agent-suite
chmod +x install.sh && ./install.sh
```

The install script copies everything into `~/.pi/agent/` and installs Pi packages.

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Pi Coding Agent Runtime                          │
│                                                                      │
│  EXTENSIONS (5 files)                                                │
│  ├── stealth-git-guard.ts      ← Blocks git commit/push             │
│  ├── session-lifecycle.ts      ← Auto-detect project + quality gate  │
│  ├── frontend-workflow.ts      ← 8 slash commands                    │
│  ├── component-intelligence.ts ← 3 LLM tools                        │
│  └── tdd-enforcer.ts           ← Enforces writing tests before code  │
│                                                                      │
│  SKILLS (16 directories)                                             │
│  ├── react-developer           ├── radix-ui                          │
│  ├── typescript-expert         ├── styled-components                  │
│  ├── stealth-git               ├── radix-styled-design-system         │
│  ├── react-testing-linting     ├── mattpocock-tdd                     │
│  ├── tdd-refactoring-workflow  ├── mattpocock-diagnose                │
│  ├── react-code-smells-fixer   ├── mattpocock-grill-with-docs         │
│  ├── dynamic-workflows         ├── mattpocock-improve-architecture    │
│  └── mattpocock-setup          └── mattpocock-caveman                 │
│                                                                      │
│  LOCAL MODELS                                                        │
│  ├── gemma-4-31B-it       (local vLLM endpoint)                      │
│  └── qwen3.6-27b-nvfp4    (local vLLM endpoint)                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Slash Commands (End-to-End Workflow)

```
/plan → /scaffold → /tdd → /refactor → /perf → /review → manual commit
```

| Command | Phase | What It Does |
| :--- | :--- | :--- |
| `/plan` | Design | Interactive spec: component tree, TS interfaces, test cases, acceptance criteria |
| `/scaffold` | Setup | Generate typed component + test + hook + CSS matching project conventions |
| `/tdd` | Implement | Strict Red → Green → Refactor loop with characterization tests |
| `/refactor` | Clean | Safety-net tests first, then decompose components, extract hooks, fix types |
| `/diagnose` | Debug | Reproduce → isolate → root-cause → TDD fix |
| `/perf` | Optimize | Re-render analysis, memo, code splitting, virtualization |
| `/audit` | Quality | Full scan: types, architecture, tests, a11y |
| `/review` | Pre-commit | Quality gate + stealth check + clean commit suggestion |

---

## 🎨 Radix UI + styled-components

Three dedicated skills ensure the agent understands your design system:

- **`radix-ui`**: Patterns for Dialog, Select, Tooltip, Tabs, DropdownMenu with proper `data-*` attribute styling and accessibility
- **`styled-components`**: Theme architecture, TypeScript `DefaultTheme` augmentation, variant patterns, `attrs` performance, `css` helpers
- **`radix-styled-design-system`**: How to wrap Radix primitives into project-level `ui/` components, compound component patterns, file organization

---

## 🌐 Microsoft Edge E2E Testing (Corporate Environment)

If you are running in a locked-down corporate network where downloading browser binaries is blocked:

1. **Configure Environment Variables**:
   Set these globally or in your test session to bypass browser downloads and target your system-installed Microsoft Edge:
   ```cmd
   :: Windows Command Prompt
   set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
   set PUPPETEER_EXECUTABLE_PATH=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
   ```
   ```powershell
   # Windows PowerShell
   $env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
   $env:PUPPETEER_EXECUTABLE_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
   ```

2. **Run Tests on Edge**:
   - For **Playwright**, ensure `playwright.config.ts` uses the `msedge` channel:
     ```typescript
     use: { channel: 'msedge' }
     ```
     Run via: `npx playwright test`
   - For **Cypress**, target the local Edge browser:
     ```cmd
     npx cypress run --browser edge
     ```

---

## 🖥 .NET Backend & Microsoft SQL Server Integration

The agent configuration has been optimized to handle .NET Core Web APIs and Microsoft SQL Server (MSSQL):

### 1. Dedicated Skills
- **`dotnet-backend`**: Best practices for ASP.NET Core controllers, dependency injection lifespans, FluentValidation, EF Core query optimization (`.AsNoTracking()`), projections, and safely running EF database migrations.
- **`mssql-database`**: Standardized T-SQL naming conventions, data types (`DATETIMEOFFSET`, `NVARCHAR`, `DECIMAL`), transaction isolation snapshot setups, clustered/non-clustered index tuning, and performance patterns.

### 2. Model Context Protocol (MCP) SQL Server Setup
The **`pi-mcp-adapter`** allows Pi to interact directly with your database.
1. **Configure Connection**: Edit `%USERPROFILE%\.pi\agent\mcp.json` (created during install).
2. **Replace `<YOUR_PASSWORD>`** in the connection string with your local SQL Server password.
3. Pi will automatically detect `mcp.json` and load the MSSQL tool harness, giving the agent ability to explore schemas, explain tables, and test queries safely in your dev environment.

---

## 🤖 Local Models

Two self-hosted models are pre-configured via vLLM OpenAI-compatible endpoints:

| Model | Provider | Endpoint | Context |
| :--- | :--- | :--- | :--- |
| `gemma-4-31B-it` | local-gemma | `<GEMMA_ENDPOINT_URL>/v1` | 64K tokens |
| `qwen3.6-27b-nvfp4` | local-qwen | `<QWEN_ENDPOINT_URL>/v1` | 256K tokens |

> [!NOTE]
> Edit `models.json` and replace `<GEMMA_ENDPOINT_URL>`, `<QWEN_ENDPOINT_URL>`, `<GEMMA_API_KEY>`, and `<QWEN_API_KEY>` with your actual values before using.

Switch models during a session with `/model` inside Pi.

---

## 🔒 Stealth Protocol

| Rule | Mechanism |
| :--- | :--- |
| **No agent commits** | `stealth-git-guard.ts` blocks `git commit`/`push` at the `tool_call` event level |
| **No AI attribution** | `SYSTEM.md` + `AGENTS.md` prohibit co-author tags, AI headers, bot disclaimers |
| **Post-edit cleanup** | `session-lifecycle.ts` strips `any` types, `console.log`, and AI residue on every agent turn |
| **Human-style output** | All code, comments, and commit suggestions indistinguishable from senior developer work |

---

## 📦 External Packages

| Package | Purpose |
| :--- | :--- |
| [pi-token-speed](https://github.com/gsanhueza/pi-token-speed) | Token speed display |
| [pi-dynamic-workflows](https://github.com/QuintinShaw/pi-dynamic-workflows) | Multi-agent pipeline orchestration |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Engineering discipline workflows |

---

## 📂 Repository Structure

```
.
├── README.md
├── install.bat                        # Windows installer (no admin required)
├── install.sh                         # macOS/Linux installer
├── .gitignore
├── SYSTEM.md                          # Core system prompt
├── AGENTS.md                          # Global repo rules
├── settings.json                      # Package, skill, and extension registry
├── models.json                        # Local model provider config (committed)
├── models.json.example                # Template reference
├── mcp.json                           # MCP Server configurations
├── mcp.json.example                   # MCP Server template reference
│
├── extensions/
│   ├── stealth-git-guard.ts           # Blocks git commit/push
│   ├── frontend-workflow.ts           # /plan /tdd /scaffold /audit /refactor /review /diagnose /perf
│   ├── component-intelligence.ts      # analyze_component, check_test_coverage, suggest_commit
│   ├── session-lifecycle.ts           # Auto-detect project + post-edit quality gate
│   └── tdd-enforcer.ts                # Programmatically enforces writing tests first
│
└── skills/
    ├── react-developer/
    ├── typescript-expert/
    ├── stealth-git/
    ├── react-testing-linting/
    ├── tdd-refactoring-workflow/
    ├── react-code-smells-fixer/
    ├── dynamic-workflows/
    ├── radix-ui/                      # Radix primitives + styled patterns
    ├── styled-components/             # Theming, variants, performance
    ├── radix-styled-design-system/    # Design system composition
    ├── e2e-testing-edge/              # Playwright/Cypress on Microsoft Edge
    ├── dotnet-backend/                # C#, ASP.NET Core, EF Core migrations
    ├── mssql-database/                # MSSQL indexes, query performance
    ├── mattpocock-tdd/
    ├── mattpocock-diagnose/
    ├── mattpocock-grill-with-docs/
    ├── mattpocock-improve-architecture/
    ├── mattpocock-caveman/
    └── mattpocock-setup/
```

---

## 🔄 After Changes

Run `/reload` inside the Pi terminal to apply changes without restarting.
