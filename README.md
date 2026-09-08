# `@lablm/contracts`

Canonical, framework-independent Zod schemas and inferred TypeScript types for LabLM wire boundaries.

Start with [the contracts documentation](docs/README.md). Agents must read [AGENTS.md](AGENTS.md) before making a non-trivial change. Reusable rules live under [docs/governance](docs/governance/README.md); the initial producer/consumer audit and unresolved mismatches live under [docs/project](docs/project/README.md).

## Public subpaths

```text
@lablm/contracts/backend/iam
@lablm/contracts/backend/ndrive
@lablm/contracts/backend/lm-service
@lablm/contracts/backend/machine
@lablm/contracts/machine-service/fms
@lablm/contracts/machine-service/inference
@lablm/contracts/machine-service/sim
```

Use a schema's `.parse()` or `.safeParse()` at runtime trust boundaries. Import only the stable subpaths above; `src/**` is internal.

## Installation

```bash
# npm
npm install @lablm/contracts

# pnpm
pnpm add @lablm/contracts
```

## Verification

```bash
pnpm run verify
```
