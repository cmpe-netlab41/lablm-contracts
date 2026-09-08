# Initial Contract Drift Audit

> **PROJECT-SPECIFIC DRIFT REGISTER**
>
> Do not copy these findings as architectural assumptions into another repository. This document records observations about the current repository only.

Snapshot date: 2026-09-02. Searches covered all `@lablm/contracts` imports plus backend, client, machine-service, CLI, transport, types, and S2S-auth sources. Re-verify before acting because this register is not a generated dependency graph.

## Summary

| Severity | Open | Resolved in this task |
|---|---:|---:|
| Critical | 0 | 0 |
| High | 2 | 1 |
| Medium | 7 | 0 |
| Low / Info | 1 | 1 |

## `DRIFT-001` — FMS issuer does not construct canonical claims

**Severity:** HIGH  
**Contract:** `FmsOperationTokenSchema`  
**Producer:** backend `NodeService#createUploadToken`  
**Consumers:** backend `UploadTokenGuard`/`extractUploadTokenPayload`; machine-service `FmsOperationGuard`  
**Observation:** The issuer signs `{ ...node }` plus JWT claims, exposing the entire local node model. It does not parse or construct through the canonical schema. The backend verifier performs `payload as unknown as UploadTokenPayloadModel`; only the machine verifier parses the canonical contract. FMS cannot safely reject unknown claims until this is migrated.  
**Classification:** PRODUCER_DRIFT  
**Risk:** Local persistence/model fields leak into a security credential; issuer and one verifier can drift independently; future authorization restrictions may be ignored.  
**Recommended action:** Decide which registered claims (for example `iat`) are intentional, add them to the canonical schema, construct only that strict schema-owned payload at issuance (or use a schema-aware signing helper), parse it in both verifiers, and remove the local payload cast. Coordinate token rollout because existing tokens include extra claims.  
**Status:** OPEN; requires backend and machine-service synchronized security migration.

## `DRIFT-002` — SIM degraded responses violate required schemas

**Severity:** HIGH  
**Contract:** `SystemInfoSchema`, `TelemetrySnapshotSchema`, `TelemetryEventSchema`  
**Producer:** machine-service `SimService`  
**Consumers:** backend `SimIntegrationService` and `MachineHealthMonitorService`; client telemetry UI  
**Observation:** On CPU or memory collection failure, SIM substitutes empty class instances. Required canonical nested fields are absent. Fully populated models pass the targeted compliance test, but actual degraded responses fail the backend's runtime schema parse, defeating the documented “one source failure must not fail the whole snapshot” invariant.  
**Classification:** AMBIGUOUS  
**Risk:** A recoverable metric-source failure becomes an unusable system-info response or terminated telemetry stream.  
**Recommended action:** Choose product semantics: emit explicit safe fallback values that satisfy the current schema, or model degraded nested fields as optional/result variants and update all consumers. Do not blindly optionalize fields or add zeroes without deciding what “unavailable” means. Add degraded-response contract tests and producer-boundary parsing.  
**Status:** OPEN; human semantic decision required.

## `DRIFT-003` — Client authentication duplicates canonical contracts

**Severity:** MEDIUM  
**Contract:** IAM login/OTP/refresh/session schemas  
**Producer:** backend IAM authentication  
**Consumer:** client `authentication.actions.ts`  
**Observation:** The client redeclares `EmailAddress`, `Phone`, login/OTP/refresh payloads, and `AuthenticatedSession`, and does not runtime-parse outgoing requests or returned sessions. The previous package README incorrectly described this file as the reference canonical consumer.  
**Classification:** DUPLICATE_CONTRACT  
**Risk:** Auth request/session changes can compile independently and malformed client input reaches the backend.  
**Recommended action:** Import the canonical body/response schemas, parse outgoing bodies and returned sessions, and retain only genuinely local aliases/wrappers.  
**Status:** OPEN; application migration is clear but outside the package-only changes made here.

## `DRIFT-004` — LM submit contract is stale and unused

**Severity:** MEDIUM  
**Contract:** `SubmitInferenceBody` and `LmInference` family  
**Producer:** backend LM-service inference controller  
**Consumer:** none found through the package subpath  
**Observation:** The canonical request exposes `payload: unknown`; the active backend DTO explicitly documents that it instead uses non-empty `contents: ContextPartDto[]`. No producer or consumer imports the `backend/lm-service` subpath.  
**Classification:** CONTRACT_DRIFT  
**Risk:** A future consumer following the published contract will send a request the live endpoint rejects.  
**Recommended action:** Establish the intended public context-part wire model, replace the stale body schema, synchronize backend validation, and add a direct consumer or endpoint conformance test. Review optional-vs-null response fields at the same time.  
**Status:** OPEN; requires an explicit public payload decision.

## `DRIFT-005` — Duplicate machine-report schema graph inside the canonical package

**Severity:** MEDIUM  
**Contract:** `FindMachineReportsResponse` versus `MachineReport`/`ListMachineReportsResponse`  
**Producer:** backend machine health  
**Consumers:** client uses `ListMachineReportsResponse`; no outside use of `FindMachineReportsResponse` found  
**Observation:** `find-machine-reports.contract.ts` independently redefines base, machine, log, error, enum, and list schemas already represented by the registry/health canonical families. The health barrel exports this legacy graph alongside the newer graph.  
**Classification:** DUPLICATE_CONTRACT  
**Risk:** Two public report definitions can evolve differently; consumers can choose incompatible shapes.  
**Recommended action:** Confirm no unpublished consumer needs the legacy export, deprecate it, migrate any user to `ListMachineReportsResponse`, then remove it in a breaking-change window.  
**Status:** OPEN; public-export removal requires compatibility confirmation.

## `DRIFT-006` — NDrive route coverage and active producers disagree

**Severity:** MEDIUM  
**Contract:** NDrive node endpoint family  
**Producer:** backend `NodeController`  
**Consumer:** client NDrive actions  
**Observation:** Contracts and client calls exist for trash/restore/delete while those backend routes are commented out. Active shared, favorites, upload-status stream, favorite-toggle, and direct upload routes do not have complete canonical endpoint/event contracts.  
**Classification:** CONTRACT_DRIFT  
**Risk:** Typed clients can call inactive routes, while active wire payloads evolve locally without canonical coverage.  
**Recommended action:** Decide which routes are supported product surface; remove/deprecate inactive contracts and client calls or implement the routes, then add canonical contracts for supported active boundaries.  
**Status:** OPEN; product surface decision required.

## `DRIFT-007` — S2S claim ownership conflicts with architecture wording

**Severity:** MEDIUM  
**Contract:** `S2SBaseClaimsSchema`  
**Producer:** `@lablm/s2s-auth` token minters  
**Consumer:** `@lablm/s2s-auth` verifier/global machine-service guard  
**Observation:** A single aligned runtime schema exists in `@lablm/s2s-auth`, while machine-service architecture says every cross-service token/claim schema is owned by `@lablm/contracts`.  
**Classification:** AMBIGUOUS  
**Risk:** Future agents may duplicate or relocate a security schema without understanding that issuer, verifier, crypto, and replay logic intentionally share one library.  
**Recommended action:** Record an architecture decision that either treats S2S auth as a justified specialized canonical owner or relocates only its pure claim schema here without creating circular dependencies.  
**Status:** OPEN; no duplicate was created.

## `DRIFT-008` — Role-create cardinality differs

**Severity:** MEDIUM  
**Contract:** `CreateRoleBody`  
**Producer:** backend IAM authorization  
**Consumer:** client role actions/forms  
**Observation:** Canonical `permittedActions` is optional and may be empty; the backend requires a non-empty array and states that a role must carry at least one permission. Canonical `index` is absent though the backend accepts an optional positive index.  
**Classification:** CONTRACT_DRIFT  
**Risk:** Payloads accepted by the canonical schema can be rejected by the producer, and a supported producer field has no canonical representation.  
**Recommended action:** Confirm the role invariant, then make `permittedActions` non-empty/required and add `index` with a coordinated client update.  
**Status:** OPEN; narrowing is breaking and needs rollout review.

## `DRIFT-009` — Machine create capability cardinality differs

**Severity:** MEDIUM  
**Contract:** `CreateMachineInput` / `MachineCapability`  
**Producer:** backend machine registry  
**Consumers:** client machine forms; machine-service environment loading  
**Observation:** The canonical create request requires at least one capability. The backend DTO accepts an empty array, while the canonical `Machine` comment says a freshly registered machine can have neither capability.  
**Classification:** AMBIGUOUS  
**Risk:** Client and backend disagree on a lifecycle-valid machine state.  
**Recommended action:** Decide whether zero-capability registration is supported, then align create DTO, schema, UI, and tests without widening merely for convenience.  
**Status:** OPEN; product lifecycle decision required.

## `DRIFT-010` — Backend API producers are not anchored to canonical schemas

**Severity:** LOW  
**Contract:** Backend IAM, NDrive, machine, and LM-service families  
**Producer:** backend controllers/DTOs/models  
**Consumers:** client and future API callers  
**Observation:** Backend package subpaths are modeled here, but backend boundary validation remains independently maintained through Nest/class-validator DTOs and local response models. Some client actions parse canonical responses, others rely only on generic TypeScript types.  
**Classification:** AMBIGUOUS  
**Risk:** Matching shapes today have no systematic producer conformance gate; drift is detected inconsistently.  
**Recommended action:** Add targeted endpoint conformance tests or explicit schema adapters family by family. Do not replace all framework DTOs mechanically.  
**Status:** OPEN; incremental enforcement work.

## `DRIFT-011` — Package governance and lint gate were missing

**Severity:** INFO  
**Contract:** package architecture/public surface  
**Producer:** package maintainers  
**Consumer:** all workspaces and agents  
**Observation:** No agent harness, governance documentation, package tests, or usable ESLint config existed; the `lint` script failed before checking source. The README asserted stale consumer adoption and treated backend implementation too strongly as contract truth.  
**Classification:** CONTRACT_DRIFT  
**Risk:** Agents could duplicate contracts, invert dependencies, or trust stale implementation; CI lint failed for tooling reasons.  
**Recommended action:** Package-local governance, architecture check, semantic tests, and current audit.  
**Status:** RESOLVED in this task.

## `DRIFT-012` — Capability schemas accepted malformed numeric/identifier claims

**Severity:** HIGH  
**Contract:** FMS and inference operation-token schemas  
**Producer:** backend token issuers  
**Consumer:** machine-service guards  
**Observation:** Token schemas previously accepted empty FMS IDs, fractional/negative sizes, and non-positive/fractional expiration values. Inference also silently stripped unknown signed claims, which could let an older verifier ignore a newly introduced restriction.  
**Classification:** CONTRACT_DRIFT  
**Risk:** Malformed or newly restricted authorization payloads could pass schema validation.  
**Recommended action:** Add semantic numeric/identifier constraints and fail closed on unknown inference claims, with negative tests.  
**Status:** RESOLVED in this task. FMS unknown-field strictness remains blocked by `DRIFT-001`.
