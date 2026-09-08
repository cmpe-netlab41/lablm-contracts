# Package Boundaries

## Dependency direction

Applications depend on contracts; contracts do not depend on applications. A contracts package MUST remain lower-level and portable. It MUST NOT import framework controllers, application services, persistence adapters, database models, UI components, or infrastructure implementations.

Pure schema libraries and TypeScript utilities MAY be dependencies when they are part of the package's chosen contract technology. Actual allowed dependencies belong in project-specific state, not this governance document.

## Domain and persistence isolation

A persistence entity MUST NOT become a wire contract merely because its current fields look convenient. Framework DTO classes MAY validate an adapter boundary, but they MUST NOT become canonical cross-boundary contracts automatically. Explicit mapping keeps internal and wire evolution independent.

## Intentional public surface

- Public exports MUST represent stable, meaningful architectural boundaries.
- Consumers MUST NOT import internal source/build paths.
- Subpaths SHOULD correspond to real boundary families, not arbitrary folder depth.
- Internal schema-building helpers SHOULD remain private unless consumers genuinely require them as public semantics.
- A giant root barrel SHOULD NOT be introduced merely for import convenience; it can erase ownership and expose helpers accidentally.
- Barrels SHOULD stay shallow enough to avoid circular dependencies and obscured ownership.

## Organization and naming

Do not reorganize boundaries solely for visual symmetry. Different domains or protocols may warrant different structures while honoring the same semantic guarantees.

Preserve stable public names unless migration value outweighs churn. New names SHOULD distinguish request, response, token, error, event, and shared primitive roles. Avoid simultaneous `Foo`, `FooContract`, `FooPayload`, and `FooSchema` names unless they represent genuinely different concepts.

## Mechanical enforcement

Projects SHOULD check dependency direction, package-manifest dependencies, declared export mappings, built entrypoint loading, and accidental internal-path imports where practical. Exact scripts and commands belong in project-specific state.
