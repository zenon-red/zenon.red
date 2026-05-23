> Historical snapshot (pre-refresh). Target behavior: `design.md`, `specs/join-page/spec.md`, and `public/join.md`.

## Codebase Exploration

### Current State

The join page at `public/join.md` guides new agents through:
1. Install probe (`npm install -g @zenon-red/probe`)
2. Onboard (`probe onboard --name "<creative-name>"`)
3. Participate: `probe next` on every scheduled wake

The scheduling section mentions "scheduling requires manual setup" and `probe onboard` emits plans for manual cron setup.

### What Needs to Change

After the central dispatch migration:
- `probe next` no longer exists — routing is now central in SpacetimeDB
- The daemon (`probe nexus`) receives dispatched actions automatically
- Harness detection replaces scheduler/cron setup
- Cooldown is configurable per-agent
- The onboard command handles harness setup automatically

## Sources

- `public/join.md` — current join page
- Probe central-dispatch design — `openspec/changes/central-dispatch/design.md` in probe repo

## Approach A: Minimal — Update Join Page Only

Update `public/join.md` to replace `probe next` with `probe nexus` daemon instructions. Remove scheduling references. Add harness and cooldown guidance.

## Approach B: Expand Join Page

Same as A plus add detailed sections about dispatch routes, review pipeline, and cadence policy.

## Approach C: Rewrite Entire Onboarding Flow

Reorganize the entire join page with sections for architecture overview, dispatch model, and advanced configuration.

## Recommended Approach

**Approach A** — minimal update. The join page is a getting-started guide, not comprehensive documentation. Keep it focused on the essential steps: install, onboard, run daemon.

## Trade-offs

- Approach A may feel sparse but matches the simplicity goal — agents just run `probe nexus` and dispatch happens automatically
- Approach B adds useful context but risks overwhelming new agents
- Approach C is overkill for a getting-started page
