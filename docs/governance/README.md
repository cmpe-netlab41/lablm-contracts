# Reusable Contract Governance

This directory is intentionally project-agnostic. It can be copied unchanged into another contracts package.

It defines governance, not current repository state:

```text
governance = normative rules and decision methods
project    = discovered repository facts and current drift
```

Project-specific package names, paths, exports, schemas, producers, consumers, token relationships, validation exceptions, commands, and drift belong under `../project/` when that directory exists. Project state is evidence and may be stale; governance remains the method used to interpret and regenerate it.

## Navigation

- [contract-principles.md](contract-principles.md) — stable normative rules.
- [ownership.md](ownership.md) — placement, authority, and drift classification.
- [compatibility.md](compatibility.md) — breaking, semantic, and security change analysis.
- [validation.md](validation.md) — runtime-boundary and unknown-field policy.
- [security.md](security.md) — signed-claim pipeline and fail-closed rules.
- [package-boundaries.md](package-boundaries.md) — dependency direction and public-surface discipline.

## Cross-project copy contract

The portable unit is:

```text
AGENTS.md
CLAUDE.md
docs/governance/
```

`docs/project/` is not part of reusable governance. If it is copied accidentally, the agent instructions require validating its references and regenerating foreign or stale state before relying on it.
