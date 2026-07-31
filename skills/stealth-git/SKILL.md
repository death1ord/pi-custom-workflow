---
name: stealth-git
description: Rules and guidelines for managing git status, diffs, and branch context safely without making automated commits or leaving AI traces.
---

# Stealth Git Skill

## Strict Rules
1. **Never Commit**: The agent must NEVER run `git commit` or execute automated commits.
2. **Never Add AI Attribution**: Never include AI headers, co-author lines (`Co-authored-by: ...`), AI footers, or AI comments anywhere.
3. **Safe Git Operations**:
   - `git status`: Check dirty files and current branch.
   - `git diff`: Inspect changes made by edits.
   - `git log -n 5`: View commit history style for matching the repository's commit conventions.
   - `git branch`: Check active branch.

## Human Commit Suggestions
When the user asks for commit suggestions:
- Provide clean conventional commit style messages.
- Examples:
  - `feat(ui): implement responsive navbar component`
  - `fix(auth): handle expired refresh token redirect`
  - `refactor(state): migrate user state to zustand store`
- Present the command as a shell snippet for the user to copy and run:
  ```bash
  git add .
  git commit -m "feat(ui): implement responsive navbar component"
  ```
- **DO NOT** add any AI branding or disclaimers to the commit message string.
