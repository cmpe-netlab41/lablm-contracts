# Validation Profile

> **PROJECT-SPECIFIC CURRENT STATE** — current schema modes, boundary adoption, and known exceptions; not reusable governance.

## Unknown-field behavior

Zod object schemas strip unknown fields by default. That is the current behavior for most backend HTTP request/response schemas, error envelopes, FMS claims, and SIM payloads in `@lablm/contracts`. This supports many additive rollouts, but parsed callers do not see newly added fields.

`InferenceOperationTokenSchema` is explicitly strict. It accepts the current optional `iat` claim and rejects unknown signed claims so an older verifier cannot silently ignore a new authorization restriction.

`FmsOperationTokenSchema` is not strict. The backend currently signs an entire `NodeModel` in addition to canonical upload claims. Making the schema strict before migrating the issuer would reject active tokens. The intended sequence is recorded under `DRIFT-001`.

## Runtime adoption by family

- **Backend IAM:** backend uses local class-validator DTOs. Client identity/authorization actions parse many outgoing bodies and selected responses; authentication actions use duplicated local types and no canonical parsing.
- **Backend NDrive:** backend uses local DTOs. Client parses several outgoing bodies; many responses remain only statically typed.
- **Backend Machine API:** client parses primary responses and several requests; backend uses local DTO/model/enum definitions. Machine Service consumes the canonical capability enum for environment validation.
- **Backend LM Service:** no producer/consumer runtime adoption of the package subpath was found; the current body contract is stale.
- **FMS:** machine guard parses verified claims; backend integration parses upload success/error. Backend's upload-token verifier does not parse canonical claims.
- **Inference:** machine guard parses verified strict claims; backend transport parses health responses.
- **SIM:** local producer models compile against inferred contract shapes and fully populated fixtures parse in tests. The backend parses system-info responses and every decoded SSE event. Actual producer output is not parsed before emission.

## Current validation gaps

- SIM CPU/memory degraded fallback objects omit fields required by canonical schemas, causing backend runtime parsing to fail (`DRIFT-002`).
- Backend HTTP families lack systematic producer conformance checks (`DRIFT-010`).
- Several client actions use canonical TypeScript response types without parsing the external response.
- FMS cannot safely adopt strict unknown-field rejection until its issuer and backend verifier migrate together.

## Current semantic tests

The contracts package tests required capability claims and numeric constraints, strict inference unknown-claim behavior, all public built entrypoints, the SIM event discriminated union, stable machine capability literals, and IAM's exactly-one-identifier refinement. Machine Service carries focused guard/HTTP and SIM conformance tests.
