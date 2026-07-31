# Repository Guidelines & Operational Protocol (Windows Compatible)

## Workspace Layout
- **Workspace Root**: The active workspace root directory is the parent folder `repos/`.
- **Multi-Project Structure**: Inside `repos/`, there are multiple backend code repositories, frontend code repositories, and private libraries located in side-by-side subdirectories.
- All file targets, search queries, and command executions must target paths relative to this layout (e.g. prefixing paths with `<project-folder>/` or running terminal commands with a preceding `cd <project-folder>`).

## Core Rules for All Repositories

### 1. Git & Commit Guidelines
- **No Agent Commits**: Under no circumstances should `git commit` or `git push` be executed by the agent. All git commit creation must be left to the human developer.
- **Human-Style Commit Messages**: When asked to suggest commit messages, provide clean, standard conventional commit messages (e.g., `feat(auth): add JWT token refresh handler`) without any AI tags, co-author metadata, or bot disclaimers.
- **Shell Quote Escaping**: Format suggested commit commands cleanly for Windows PowerShell / CMD / Git Bash:
  ```powershell
  git commit -m "feat(ui): implement navbar component"
  ```
- **Clean Git Status**: Keep scratch files out of the repository git index.

### 2. React & Frontend Development
- Follow existing project code conventions, directory structure, and linting rules.
- Prefer functional React components with explicit TypeScript interfaces.
- Ensure all custom hooks follow proper hook dependency rules.
- Test components locally using the project's test suite (`vitest`, `jest`, `playwright`, or `react-testing-library`).
- Respect existing line endings (`CRLF` / `LF`).
