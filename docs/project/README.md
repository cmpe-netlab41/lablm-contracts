# Current Repository Contract State

> **PROJECT-SPECIFIC STATE**
>
> This directory is derived from the current LabLM repository. It is evidence/current state, not reusable architecture methodology. Re-audit or regenerate it when package exports, producers, consumers, validation behavior, security topology, or tooling changes. Do not copy it as part of the portable governance bundle.

## Contents

- [package-surface.md](package-surface.md) — current package name, subpaths, organization, dependencies, tooling, and CI integration.
- [contract-inventory.md](contract-inventory.md) — current meaningful boundaries, producers, consumers, and schemas.
- [security-inventory.md](security-inventory.md) — actual token schemas, issuers, verifiers, and replay behavior.
- [validation-profile.md](validation-profile.md) — current strict/strip behavior and validation gaps.
- [contract-drift.md](contract-drift.md) — dated findings and unresolved decisions.

If these files name packages, paths, exports, or schemas that no longer exist, treat the state as stale and repeat the bootstrap protocol in [AGENTS.md](../../AGENTS.md).

## Current verification commands

From the monorepo root:

```bash
pnpm --filter @lablm/contracts lint
pnpm --filter @lablm/contracts architecture:check
pnpm --filter @lablm/contracts typecheck
pnpm --filter @lablm/contracts build
pnpm --filter @lablm/contracts test
pnpm --filter @lablm/contracts verify
```

Affected direct consumers/producers:

```bash
pnpm --filter @lablm/machine-service typecheck
pnpm --filter @lablm/machine-service test
pnpm --filter @lablm/backend typecheck
pnpm --dir apps/client exec tsc --noEmit
```

Repository CI also runs root `lint`, `typecheck`, `build`, and `test` tasks through Turbo. The contracts package's `lint` and `test` scripts are therefore included without a separate workflow.
