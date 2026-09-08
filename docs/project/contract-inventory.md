# Contract Inventory

> **PROJECT-SPECIFIC SNAPSHOT**
>
> This file is derived from repository inspection. It is not reusable governance. Re-run producer/consumer discovery before relying on stale entries or when applying the governance system to another repository.

This inventory covers significant families, not every helper. Re-run repository searches before any change; imports and behavior can outgrow this snapshot (2026-09-02).

## Backend IAM

**Boundary:** Backend HTTP API ↔ Client  
**Subpath:** `@lablm/contracts/backend/iam`  
**Purpose:** Authentication requests/session responses; identity users/invitations; authorization roles/permissions; list primitives and endpoint bodies/responses.  
**Producer:** `apps/backend/src/domains/iam/{authentication,identity,authorization}`.  
**Consumers:** `apps/client/src/domains/iam/actions/**` and IAM/support UI components.  
**Canonical schemas:** `LoginWithCredentialsBody`, `RequestOtpBody`, `AuthenticatedSession`, `User`, `Role`, endpoint `*Body`/`*Query`/`*Response` values.  
**Security sensitivity:** High for authentication/password payloads; medium for authorization permission semantics.  
**Runtime expectations:** Backend currently uses local class-validator DTOs rather than these schemas. Client identity/authorization actions parse many outgoing bodies and selected responses; authentication actions do not.  
**Known drift:** `DRIFT-003`, `DRIFT-008`, `DRIFT-010`.

## Backend NDrive

**Boundary:** Backend HTTP API ↔ Client  
**Subpath:** `@lablm/contracts/backend/ndrive`  
**Purpose:** Node/ACE wire projections, list requests/responses, folder/upload-session operations, moves/renames/copies/sharing.  
**Producer:** `apps/backend/src/domains/ndrive/{node,ace}`.  
**Consumers:** `apps/client/src/domains/ndrive/actions/**` and NDrive UI.  
**Canonical schemas:** `Node`, `Ace`, `CreateUploadSessionBody`, `CreateFolderBody`, `ListNodesQuery/Response`, `ShareNodeInput`, update/move/rename response families.  
**Security sensitivity:** Medium; ownership/access semantics are authorization relevant. The returned `fmsToken` is a security credential but its claims are governed by the FMS token schema.  
**Runtime expectations:** Backend validates local DTOs. Client parses several outgoing bodies but many external responses remain only statically typed.  
**Known drift:** Active shared/favorites/status/toggle routes lack canonical endpoint contracts, while trash/restore/delete contracts target disabled routes (`DRIFT-006`).

## Backend LM Service

**Boundary:** Backend HTTP API ↔ future API consumers  
**Subpath:** `@lablm/contracts/backend/lm-service`  
**Purpose:** Inference submission/read requests and persisted public inference summaries.  
**Producer:** `apps/backend/src/domains/lm-service/inference`.  
**Consumers:** No direct monorepo import found outside this package.  
**Canonical schemas:** `SubmitInferenceBody`, `SubmitInferenceResponse`, `GetInferenceResponse`, `LmInference`, status/finish-reason enums.  
**Security sensitivity:** Medium; prompts/context and user-owned records cross an authenticated API boundary.  
**Runtime expectations:** No producer or consumer runtime parse against this subpath today.  
**Known drift:** The active backend request uses `contents: ContextPartDto[]`; the canonical body still exposes `payload: unknown` (`DRIFT-004`).

## Backend Machine API

**Boundary:** Backend HTTP API ↔ Client; configuration primitive shared with Machine Service  
**Subpath:** `@lablm/contracts/backend/machine`  
**Purpose:** Machine registry, health reports/logs, connection checks, stable capability/status/error enums.  
**Producer:** `apps/backend/src/domains/machine`.  
**Consumers:** Client machine actions/UI; machine-service domain/configuration loading consumes `MachineCapability`.  
**Canonical schemas:** `MachineCapability`, `MachineStatus`, `Machine`, create/update/list/get contracts, `MachineLog`, `MachineReport`, `CheckInferenceConnectionResult`.  
**Security sensitivity:** Medium; capabilities control loaded machine domains and registry operations are privileged.  
**Runtime expectations:** Client actions parse primary responses and several requests. Backend uses local DTO/model/enum definitions. Machine Service uses the canonical capability enum for environment validation.  
**Known drift:** duplicate legacy report schema graph (`DRIFT-005`) and create-capability cardinality disagreement (`DRIFT-009`).

## Machine Service FMS

**Boundary:** Backend ↔ Machine Service; the same upload credential is relayed Client → Backend → Machine Service  
**Subpath:** `@lablm/contracts/machine-service/fms`  
**Purpose:** Upload capability claims, upload result, health response, and FMS error envelope.  
**Producer:** Backend mints upload claims; Machine Service produces upload/health/error responses.  
**Consumers:** Backend upload guard and FMS integration; Machine Service FMS guard.  
**Canonical schemas:** `FmsOperationTokenSchema`, `WriteResultSchema`, `FmsHealthSchema`, `FmsErrorSchema`.  
**Security sensitivity:** High.  
**Runtime expectations:** Machine guard parses verified claims; backend integration parses upload success/error. Backend's own upload-token verifier casts decoded claims and the issuer does not parse/construct through the canonical schema.  
**Known drift:** `DRIFT-001`.

## Machine Service Inference

**Boundary:** Backend ↔ Machine Service  
**Subpath:** `@lablm/contracts/machine-service/inference`  
**Purpose:** Single-use inference capability claims and health response.  
**Producer:** Backend inference integration auth strategy mints tokens; Machine Service produces health.  
**Consumers:** Machine Service inference guard; backend inference integration parses health.  
**Canonical schemas:** `InferenceOperationTokenSchema`, `InferenceHealthSchema`.  
**Security sensitivity:** High.  
**Runtime expectations:** The guard parses after signature verification and before replay consumption. Backend transport parses health. Unknown inference claims now fail closed.  
**Known drift:** No current issuer/verifier shape mismatch found. Chat-completion forwarding remains unimplemented in backend; canonical ownership for that OpenAI-compatible payload must be decided when the boundary becomes active.

## Machine Service SIM

**Boundary:** Machine Service ↔ Backend; Backend forwards telemetry events to Client  
**Subpath:** `@lablm/contracts/machine-service/sim`  
**Purpose:** System inventory, telemetry snapshots, SSE event discriminants, stream cadence metadata, error envelope.  
**Producer:** `apps/machine-service/src/domains/sim`.  
**Consumers:** backend SIM integration/health monitor and client telemetry UI.  
**Canonical schemas:** `SystemInfoSchema`, `TelemetrySnapshotSchema`, `TelemetryEventSchema`, `SimErrorSchema`.  
**Security sensitivity:** Low for operation authorization (S2S only), but hardware/telemetry remains authenticated information.  
**Runtime expectations:** SIM models compile against inferred schema shapes and targeted tests parse fully populated models. Backend parses system-info responses and every decoded SSE event. The producer does not parse actual responses at its output boundary.  
**Known drift:** degraded fallback instances omit required nested fields and fail consumer parsing (`DRIFT-002`). Older SIM architecture prose still says adoption has not occurred; enforcement-backlog reflects the current partial adoption.

## Adjacent S2S authentication

**Boundary:** Service issuer ↔ service verifier  
**Canonical location today:** `@lablm/s2s-auth` (`S2SBaseClaimsSchema`), not a contracts subpath.  
**Purpose:** issuer, audience, replay ID, issued-at, and expiration claims plus crypto/replay behavior.  
**Producers/consumers:** backend token minters and machine-service global S2S guard.  
**Security sensitivity:** High.  
**Runtime expectations:** shared library signs, verifies, parses, and tests the claims.  
**Known drift:** canonical behavior is aligned, but documented package ownership is ambiguous (`DRIFT-007`).
