# Contract Compatibility

Every public contract change is classified before implementation.

## Categories

### `NON_BREAKING`

Examples include adding an optional field when all affected consumers tolerate unknown fields, strengthening documentation without changing meaning, or adding a new isolated subpath.

### `BREAKING`

Examples include removing/renaming a field, changing an enum or discriminant, making an optional field required, narrowing accepted input, changing output nullability, or removing an export.

### `SEMANTICALLY_BREAKING`

The shape still compiles, but the meaning changes. For example, changing a field from informational metadata to an enforced authorization constraint is contract-significant.

### `SECURITY_RELEVANT`

Any claim, scope, operation constraint, token lifetime, error disclosure, or trust-boundary validation change. This category can overlap the other three.

## Required analysis

For an existing contract, record:

```text
Contract and boundary
Producer(s) and consumer(s)
Current canonical behavior
Proposed shape and semantic delta
Unknown-field/nullability/default/coercion impact
Rollout order and backward-compatibility strategy
Security impact
Verification coverage
```

Search by contract name, schema name, package subpath, discriminant/enum values, token header, and relevant error codes. Compile-time imports alone do not reveal JSON consumers or handwritten duplicates.

## Runtime-schema cautions

- Tightening input validation is breaking for callers that currently send the rejected shape, even if that input was undesirable.
- Adding an output field is safe only if consumers tolerate unknown fields. Strict schemas do not.
- Defaults and coercions change the inferred input/output relationship; check callers typed against accepted input as well as consumers typed against parsed output.
- Optional, nullable, and omitted are different wire states.
- Changing a discriminator or enum literal is normally breaking even if a fallback branch exists.
- A schema parse that strips unknown fields may make a rollout wire-compatible while hiding the new field from older consumers. For authorization claims, that can be unsafe.

## Staged migrations

Use parallel optional fields or a deliberate dual-reader/single-writer sequence only when producer and consumer cannot deploy atomically. State which representation is canonical during the transition and set an explicit removal condition. Do not introduce `v1`/`v2` without a real coexistence need.
