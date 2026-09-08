# Security Contract Inventory

> **PROJECT-SPECIFIC SECURITY TOPOLOGY** — current issuer/verifier relationships in LabLM, not reusable governance.

## FMS upload capability

**Contract:** FMS upload operation capability  
**Canonical location:** `FmsOperationTokenSchema` in `@lablm/contracts/machine-service/fms`  
**Issuer:** `apps/backend/src/domains/ndrive/node/node.service.ts#createUploadToken`  
**Verifiers:** backend `UploadTokenGuard`/`NodeService#extractUploadTokenPayload`; machine-service `FmsOperationGuard`  
**Semantics:** `id` is the opaque storage locator; `size` is the operation ceiling and cannot raise the machine-local maximum; `jti` is single-use; `exp` bounds validity.  
**Runtime validation:** Machine Service verifies the EdDSA signature, parses the canonical schema, then consumes replay state. The backend verifier currently performs a chained cast instead of canonical parsing.  
**Replay semantics:** Process-local, single-use enforcement in Machine Service; the backend also stores the issued token in Redis as part of its upload flow.  
**Known drift:** `DRIFT-001`; the issuer signs the entire `NodeModel`, preventing safe strict unknown-claim rejection until a coordinated migration.

## Inference capability

**Contract:** Inference operation capability  
**Canonical location:** `InferenceOperationTokenSchema` in `@lablm/contracts/machine-service/inference`  
**Issuer:** `apps/backend/src/integrations/machine-service/inference/inference-integration.module.ts`  
**Verifier:** `apps/machine-service/src/domains/inference/guard/inference-operation.guard.ts`  
**Semantics:** `jti` is single-use, `exp` bounds validity, and optional `iat` reflects the current issuer.  
**Runtime validation:** EdDSA verification precedes strict canonical parsing; unknown signed claims are rejected; parsing precedes replay consumption.  
**Replay semantics:** Process-local replay cache under the documented one-logical-instance-per-machine assumption.  
**Known drift:** No current issuer/verifier shape mismatch found. Adding model, operation, resource, or token-budget claims must update issuer, schema, semantic enforcement, and HTTP security tests together.

## S2S authentication claims

**Contract:** Base service-to-service identity claims  
**Canonical location today:** `S2SBaseClaimsSchema` in `@lablm/s2s-auth`  
**Issuer:** backend `createS2STokenMinter` call sites  
**Verifier:** machine-service global S2S guard through `@lablm/s2s-auth`  
**Semantics:** trusted issuer, target audience, replay ID, expiration, and optional issued-at.  
**Runtime validation:** `@lablm/s2s-auth` pins EdDSA, verifies issuer/audience/signature/expiry, parses the shared schema, then the guard consumes replay state.  
**Replay semantics:** Process-local under the current machine-service deployment assumption.  
**Known drift:** `DRIFT-007`; runtime ownership is aligned in one shared library, but machine-service architecture wording assigns all cross-service claims to `@lablm/contracts`. Formal ownership remains ambiguous; no duplicate was created.
