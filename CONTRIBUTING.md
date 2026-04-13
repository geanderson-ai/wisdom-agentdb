# Contributing

Thanks for taking a look at Wisdom AgentDB.

## How to contribute

- Open an issue before large changes.
- Keep changes small and focused.
- Add or update docs with any architecture change.
- Prefer boring, explicit code over clever abstractions.
- Keep the core memory schema stable unless there is a strong reason to change it.

## Working guidelines

- Python owns the memory engine.
- TypeScript owns the user-facing surfaces.
- Avoid duplicating business logic across languages.
- Reuse benchmark patterns where they are strong, but keep the product contract ours.

## Pull request expectations

- Clear summary of the change
- Tests or validation notes when relevant
- Documentation updates for behavior changes
- No unrelated refactors

## Style

- Follow KISS, DRY, and YAGNI.
- Prefer explicit names for scopes, events, and policies.
- Keep memory artifacts auditable and traceable.

