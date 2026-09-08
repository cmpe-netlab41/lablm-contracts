# Package Surface

> **PROJECT-SPECIFIC SNAPSHOT** — derived from the current repository; not reusable governance.

## Package

Name: `@lablm/contracts`  
Location: `packages/contracts`  
Runtime technology: Zod schemas with inferred TypeScript types  
Runtime dependency policy: `zod` only  
Development dependencies currently allowed: `typescript`, `zod`

## Public subpaths

| Subpath | Boundary |
|---|---|
| `@lablm/contracts/backend/iam` | Backend IAM ↔ Client |
| `@lablm/contracts/backend/ndrive` | Backend NDrive ↔ Client |
| `@lablm/contracts/backend/lm-service` | Backend LM Service ↔ API consumers |
| `@lablm/contracts/backend/machine` | Backend Machine API ↔ Client; `MachineCapability` is also used by Machine Service configuration |
| `@lablm/contracts/machine-service/fms` | Backend ↔ Machine Service FMS |
| `@lablm/contracts/machine-service/inference` | Backend ↔ Machine Service Inference |
| `@lablm/contracts/machine-service/sim` | Machine Service SIM ↔ Backend; telemetry is forwarded to Client |

There is no package-root export. Consumers use declared subpaths and must not import `src/**` or `dist/**` directly.

## Current source organization

- `src/backend/<bounded-context>` contains backend HTTP boundary families.
- `src/machine-service/<domain>` contains Backend ↔ Machine Service families.
- `domain/` contains reusable wire projections/primitives within a public family.
- `contract/` contains endpoint, token, event, and error schemas.
- `src/backend/common` provides internal composition helpers and is not a public subpath.

Current naming conventions differ by established family: backend HTTP schemas use values/types such as `FooBody`, `FooQuery`, and `FooResponse`; machine-service families generally use `FooSchema` plus an inferred `Foo` or `FooResponse`. `WriteResultSchema`/`UploadResponse` is an existing stable irregularity and has not been renamed.

## Mechanical enforcement

- `scripts/check-architecture.mjs` restricts source imports and package dependencies, and checks every manifest export against a source index and built mapping.
- `tests/contracts.test.cjs` loads all seven built subpaths and tests security claims, stable enums/discriminants, and cross-field semantics.
- `package.json` exposes `architecture:check`, `typecheck`, `build`, `test`, and aggregate `verify` scripts.
- Existing monorepo CI discovers the package `lint` and `test` tasks through Turbo; no contracts-only workflow exists.

See [README.md](README.md) for exact commands.
