# Ownership

## Placement test

A candidate belongs in a shared contracts package only when all answers are yes:

1. Does it cross a process, service, application, worker, or issuer/verifier boundary?
2. Must independently evolving producer and consumer code agree on its shape or semantics?
3. Is this package the intended canonical owner rather than a domain-specific protocol library with explicit shared ownership?
4. Can it remain framework- and persistence-independent?

Multiple files sharing a shape is not enough. A local wrapper, view model, form state, database entity, provider-specific payload, or internal event stays with its owner unless it crosses such a boundary.

## Authority model

```text
Canonical Contract       intended wire shape and semantics
Producer Behavior        what is emitted or accepted today
Consumer Expectation     what callers parse or rely upon today
Implementation Model     local DTO/entity/class used internally
```

When these disagree, consult architecture docs, endpoint behavior, tests, and explicit product decisions. Recency and convenience do not establish authority.

## Drift classification

- `PRODUCER_DRIFT`: producer emits/accepts data inconsistent with the canonical contract.
- `CONSUMER_DRIFT`: consumer expects or constructs data inconsistent with it.
- `CONTRACT_DRIFT`: explicit intended behavior has changed but the canonical definition has not.
- `DUPLICATE_CONTRACT`: a local definition independently duplicates an existing canonical contract.
- `UNUSED_CONTRACT`: a canonical definition has no active producer or consumer adoption.
- `AMBIGUOUS`: repository evidence cannot establish the intended semantics or owner.

For `AMBIGUOUS`, preserve safe behavior, record the exact disagreement, and request the smallest product/architecture decision needed. Do not guess.

## Producer inspection protocol

When work starts from producer implementation code:

1. Inspect the boundary adapter and actual payload path, not generated API documentation alone.
2. Inspect the service/model only to understand mapping and semantics.
3. Search the contracts package for the existing canonical schema and primitives.
4. Search every producer, consumer, mapper, test, subpath import, enum, and error code.
5. Classify drift before modifying the canonical contract.
6. Change the contract only when intended boundary semantics require it, then synchronize both sides.

Framework DTO classes may remain adapter-local. They must not evolve as an independent source of wire truth; use an explicit mapping or conformance strategy.
