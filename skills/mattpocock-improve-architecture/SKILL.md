---
name: mattpocock-improve-architecture
description: Matt Pocock's codebase architecture audit workflow for identifying module boundary issues and refactoring opportunities.
---

# Matt Pocock Codebase Architecture Improvement (`mattpocock-improve-architecture`)

## Purpose
Systematically inspect repository structure to find "deepening opportunities"—improving encapsulation, eliminating circular dependencies, and extracting shared abstractions.

## 🏗 Audit Steps

1. **Module Boundary Inspection**: Check for leaky internal abstractions, long prop chains, and monolithic files.
2. **Type Safety & Schema Audit**: Identify `any` leaks, untyped API contracts, and missing union types.
3. **Refactoring Proposal**: Generate a structured plan detailing components to break down, custom hooks to extract, and types to solidify.
