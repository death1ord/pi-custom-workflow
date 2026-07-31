---
name: mattpocock-diagnose
description: Matt Pocock's systematic bug diagnosis, triage, and reproduction workflow.
---

# Matt Pocock Bug Diagnosis Skill (`mattpocock-diagnose`)

## Purpose
Systematically investigate, isolate, and reproduce bugs before attempting any code edits.

## 🕵️ Diagnosis Process

1. **Information Gathering & Symptom Analysis**
   - Read full un-truncated error stack traces and logs.
   - Map out affected files, components, and data paths.

2. **Reproduction Unit Test**
   - Write a minimal failing test that reproduces the bug consistently.
   - Confirm failure reproduces in isolation.

3. **Root Cause Analysis**
   - Trace state mutations, race conditions, type mismatches, or missing null checks.
   - Formulate a single, empirically verified hypothesis.

4. **Remediation Plan**
   - Outline targeted fix steps without touching collateral code.
