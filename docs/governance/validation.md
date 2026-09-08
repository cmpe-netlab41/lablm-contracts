# Runtime Validation

## Boundary rule

Runtime validation is required for untrusted HTTP requests, signed claims after cryptographic verification, external service responses whose shape cannot be assumed, and messages/events crossing processes. Static types are useful inside a process but are not runtime security.

For a schema system with a throwing parse API, the boundary may look like:

```ts
const value = ContractSchema.parse(untrustedValue);
```

For a result-returning API, handle both success and failure branches. Never ignore a failure, return the original payload on failure, or use a cast as validation.

## Producer and consumer expectations

- Request producer: parse/construct the outgoing body when invalid local data is possible.
- Request consumer: validate incoming data at the framework/boundary adapter and map it to local models.
- Response producer: construct from the canonical type and validate when local models or partial fallbacks can drift.
- Response consumer: parse an external response before domain use.
- Stream consumer: parse each decoded JSON event; transport framing is handled separately.
- Signed-token consumer: verify cryptography first, parse canonical claims second, enforce semantics third.

## Unknown-field policy

Choose and document unknown-field behavior per contract rather than imposing one global mode:

- **Strict/reject:** safest when an unknown authorization-relevant field could be ignored, but additive producer changes break older consumers.
- **Strip:** often supports additive wire compatibility, but parsed callers cannot observe the new fields and may silently ignore new semantics.
- **Passthrough/preserve:** retains forward data but can accidentally propagate unvalidated content.

Security claims SHOULD reject unknown authorization-relevant fields. Public additive responses MAY strip or preserve unknown fields when rollout compatibility requires it. Requests MAY strip presentation-only noise only when doing so cannot alter authorization or intent. Any policy change is compatibility-significant and must be tested.

## Semantic tests

Test project rules, not the schema library itself: required claims, non-empty identifiers, numeric/enum constraints, cross-field refinements, discriminated unions, strict unknown-claim behavior, coercion/output types, and compatibility-sensitive nullability/defaults.
