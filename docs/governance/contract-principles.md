# Contract Principles

The terms MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are normative.

## `CONTRACT-OWN-001` — Cross-boundary ownership

**Rule:** A definition belongs here only when more than one independently evolving boundary must agree on its wire shape or semantics.

**Rationale:** Similar local types are not necessarily the same contract.

**Allowed:** Backend ↔ Client, Service A ↔ Service B, producer ↔ worker, or issuer ↔ verifier payloads. These are illustrative boundary categories; local models may map to them.

**Forbidden:** database entities, ORM projections, framework DTOs, UI state, or generic helpers added only for reuse.

**Enforcement:** review plus the ownership test in [ownership.md](ownership.md).

## `CONTRACT-SCHEMA-001` — One canonical definition

**Rule:** A cross-boundary wire contract MUST have one canonical definition. Existing canonical definitions MUST be reused rather than duplicated.

**Rationale:** Independently maintained producer, consumer, and package definitions drift silently.

**Allowed:** adapters or domain wrappers that explicitly map to the canonical schema.

**Forbidden:** parallel interfaces/classes that claim independent authority over the same wire payload.

**Enforcement:** monorepo consumer discovery, compile checks, contract tests, and drift review.

## `CONTRACT-SCHEMA-002` — Schema-derived types

**Rule:** Where runtime validation is required, TypeScript types SHOULD be inferred from the runtime schema.

**Rationale:** An independently declared interface can disagree with the validator.

**Allowed:** `const FooSchema = schema.object(...); type Foo = Infer<typeof FooSchema>`, or another schema-first convention that preserves one runtime/static definition. This is illustrative pseudocode, not a required schema library.

**Forbidden:** schema/type pairs maintained separately without a semantic reason.

**Enforcement:** package tests and review.

## `CONTRACT-DRIFT-001` — Implementation is evidence

**Rule:** Existing implementation MUST NOT automatically override the canonical contract.

**Rationale:** Producers and consumers can both be stale or wrong.

**Allowed:** repository evidence plus architecture/product documentation used to classify `PRODUCER_DRIFT`, `CONSUMER_DRIFT`, `CONTRACT_DRIFT`, `DUPLICATE_CONTRACT`, `UNUSED_CONTRACT`, or `AMBIGUOUS`.

**Forbidden:** weakening or rewriting a schema solely because one implementation does not satisfy it.

**Enforcement:** the change protocol in [AGENTS.md](../../AGENTS.md), repository discovery, and a project-specific drift register.

## `CONTRACT-MODEL-001` — Domain model is not wire contract

**Rule:** Local domain models MAY differ from wire contracts, but boundary data MUST map to and, where required, validate against the canonical schema.

**Rationale:** Persistence and internal modeling evolve for different reasons than wire compatibility.

**Forbidden:** exporting persistence entities or framework DTO classes as canonical contracts by convenience.

**Enforcement:** dependency check and producer/consumer review.

## `CONTRACT-VALID-001` — Runtime trust-boundary validation

**Rule:** Untrusted HTTP payloads, signed claims after verification, external service responses, and process-crossing events MUST be runtime validated where the boundary owns validation.

**Rationale:** TypeScript types do not exist at runtime.

**Forbidden:** casts, ignored validation failures, or fallback-to-unvalidated-payload behavior.

**Enforcement:** semantic schema tests and affected-application tests.

## `CONTRACT-SEC-001` — Signed claims pipeline

**Rule:** Security-sensitive signed claims MUST follow issuer construction → canonical schema → signing → cryptographic verification → canonical schema validation → semantic enforcement.

**Rationale:** A valid signature proves authenticity, not claim validity or authorization meaning.

**Forbidden:** issuer/verifier definitions that evolve independently, or replay consumption before schema validation.

**Enforcement:** negative schema tests and trust-boundary integration tests in consuming applications.

## `CONTRACT-COMPAT-001` — Compatibility analysis

**Rule:** A public contract change MUST assess all known producers and consumers, including semantic and security impact.

**Rationale:** Shape-compatible meaning changes can still break behavior or authorization.

**Enforcement:** required plan format and [compatibility.md](compatibility.md).

## `CONTRACT-SYNC-001` — Cross-boundary synchronization

**Rule:** Directly affected monorepo producers and consumers SHOULD be updated in the same task. A staged migration MUST preserve backward compatibility or document the temporary dual state.

**Forbidden:** intentionally landing a canonical change with known consumers broken and no migration plan.

## `CONTRACT-DEP-001` — Low-level dependency direction

**Rule:** A contracts package MUST NOT depend on applications, frameworks, databases, infrastructure adapters, or project implementation packages.

**Enforcement:** package-local dependency/architecture checks and CI where available.

## `CONTRACT-PUB-001` — Intentional public surface

**Rule:** Public exports MUST expose stable boundary subpaths, not internal source paths or helper implementation details.

**Forbidden:** consumer imports from a package's internal implementation directories, a catch-all root barrel, or accidental helper export.

**Enforcement:** package export mapping check and built-entrypoint smoke test.

## `CONTRACT-ERROR-001` — Wire errors only

**Rule:** Only errors that cross an architectural boundary belong here. They SHOULD expose stable machine-readable codes and semantics where consumers branch on them.

**Forbidden:** treating internal exception class structure or human-readable messages as the stable machine contract.

## `CONTRACT-STREAM-001` — Payload separate from framing

**Rule:** Stream-event JSON payloads MAY be canonical without forcing domains to share a transport implementation.

**Rationale:** Transport framing and payload compatibility are different concerns.
