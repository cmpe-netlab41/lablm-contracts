# Contracts Package — Agent Instructions

## Purpose and authority

This package is the canonical, low-level owner of wire contracts shared by independently evolving boundaries. It is not a generic shared-types package. Existing code is evidence of behavior, not automatic contract authority.

Authority is deliberately separated:

```text
docs/governance/   normative, reusable methodology
docs/project/      repository-specific evidence and current state
package source     actual canonical contract definitions
```

Read [docs/governance/README.md](docs/governance/README.md) before any non-trivial change. Load only the relevant governance documents, then inspect `docs/project/` when it exists.

## Project-state validation

Project inventory is potentially stale evidence. Before trusting `docs/project/`, verify that its package names, manifest paths, exports, producer/consumer paths, schemas, and commands exist in the current repository.

If project state is missing, empty, stale, or obviously foreign, do not use it as authority. Regenerate it from repository inspection before changing a public contract:

1. Discover the contracts package and repository root.
2. Discover its manifest, dependencies, exports, subpaths, source organization, and scripts.
3. Search all applications/packages for producers and consumers.
4. Identify meaningful cross-boundary contract families.
5. Identify security-sensitive claims, issuers, verifiers, and replay semantics.
6. Inspect runtime-validation and unknown-field behavior.
7. Rebuild `docs/project/package-surface.md`.
8. Rebuild `docs/project/contract-inventory.md`.
9. Rebuild `docs/project/security-inventory.md` and `validation-profile.md`.
10. Audit drift and rebuild `docs/project/contract-drift.md`.
11. Record actual verification commands in `docs/project/README.md`.

Do not edit reusable governance during bootstrap merely because the new repository is organized differently. Change governance only for a genuine methodological flaw.

## Consumer discovery protocol

Before modifying an existing public contract, search the repository for its contract/type name, schema name, package subpath, related enums/discriminants/error codes, token headers, and handwritten equivalents. Classify hits as `Producer`, `Consumer`, `Test`, `Mapper`, or `Unused`. Documentation never replaces current search.

When work starts from an implementation, inspect its endpoint/service/use case, canonical schema, and all consumers. Never reason “the implementation returns X, therefore X is canonical.” First classify producer, consumer, contract, duplication, unused-contract, or ownership drift.

## Contract change workflow

Use this concise plan for non-trivial work:

```text
Contract:
Boundary:
Producer(s):
Consumer(s):
Compatibility: NON_BREAKING | BREAKING | SEMANTICALLY_BREAKING | SECURITY_RELEVANT
Canonical changes:
Implementation changes:
Verification:
```

Then follow:

```text
DISCOVER → OWNERSHIP → CONSUMERS → COMPATIBILITY → CHANGE CANONICAL
→ UPDATE PRODUCERS → UPDATE CONSUMERS → VALIDATE → DOCUMENT
```

Update directly affected producers and consumers in the same task when feasible. A staged migration must preserve compatibility or explicitly document its temporary dual state.

## Context routing

| Change | Governance to read | Project state to inspect |
|---|---|---|
| Existing schema | `validation.md`, `compatibility.md` | inventory, validation profile, drift |
| Signed claim/token | `security.md`, `validation.md`, `compatibility.md` | security inventory, validation profile, drift |
| New contract/subpath | `ownership.md`, `package-boundaries.md`, `compatibility.md` | package surface, inventory |
| Producer/consumer mismatch | `ownership.md`, `compatibility.md` | inventory and drift |
| Error or stream payload | `contract-principles.md`, `validation.md` | relevant inventory entry |

Obey any additional agent instructions governing producer or consumer code before modifying it.

## Security and validation

Cryptographic validity is not schema validity. Signed claims require canonical schema validation after verification and before semantic enforcement or replay handling. Never replace runtime validation with a cast, ignored parse failure, or unvalidated fallback. Follow `docs/governance/security.md`.

## Documentation and verification

After a change, ask whether ownership, semantics, compatibility, validation guarantees, security posture, public exports, producer/consumer inventory, or known drift changed. Update reusable governance only for methodology; update project state for repository facts.

Discover and run the actual package/project commands recorded in current project state and manifests. For public changes, verify every known direct producer and consumer. Security behavior must be tested through the real trust-boundary pipeline rather than only through tests that bypass middleware, guards, or adapters.

## Forbidden behaviors

- Adding a type merely because two files look similar.
- Treating a database entity, framework DTO, UI state, or application model as the wire contract by default.
- Importing application/framework implementation code into the contracts package.
- Creating a second local wire definition when a canonical schema exists.
- Using chained casts, ignored parse failures, permissive escape hatches, or unjustified unknown types as trust-boundary validation.
- Weakening security claims or widening schemas merely to make tests pass.
- Importing a contracts package's internal source/build paths or exporting helpers accidentally.
- Guessing through an ambiguous producer/consumer disagreement.
- Trusting project-state files whose referenced repository objects do not exist.

## Definition of done

A non-trivial task is done only when the canonical contract is correct; known producers, consumers, runtime validation, tests, exports, compatibility/security assessment, and relevant project state are synchronized; and no unnecessary duplicate local contract was introduced.

## Portable unit

The reusable copy unit is exactly `AGENTS.md`, `CLAUDE.md`, and `docs/governance/`. `docs/project/` is discovered state and is not part of the portable governance bundle.
