# Security Contract Governance

Security-sensitive contracts require issuer/verifier traceability and fail-closed validation.

## Mandatory pipeline

```text
issuer selects exact semantic claims
→ canonical schema validates/constructs claims
→ claims are signed
→ verifier pins algorithm/key and verifies signature/expiry
→ canonical schema validates decoded claims
→ domain semantics/constraints are enforced
→ replay identifier is consumed
```

A signature proves that a key holder signed bytes. It does not prove that required claims exist, that their types/values are valid, or that the operation is authorized.

## Security principles

- Signature authenticity is not claim validity.
- Issuer and verifier MUST share one semantic contract owner.
- The issuer SHOULD construct the smallest intentional claim set through the canonical schema before signing.
- The verifier MUST parse verified bytes through that schema before semantic enforcement or replay consumption.
- Authorization-relevant unknown claims MUST fail safely; an older verifier must not silently discard a newly introduced restriction.
- A cast is not runtime validation.
- Claim, scope, lifetime, resource-constraint, replay, and unknown-field changes are `SECURITY_RELEVANT` and require coordinated rollout analysis.
- Replay protection MUST be ordered after claim validation and designed for the actual deployment topology.

## Required negative cases

At minimum cover missing required claims, wrong types, empty identifiers/replay IDs, invalid enums/operations, invalid resource constraints, invalid numeric ceilings, unknown authorization claims under a strict policy, and expiration semantics owned by the relevant layer. A correctly signed malformed token must be rejected through the consuming application's real trust-boundary pipeline, not only by a direct unit call that bypasses middleware or guards.
