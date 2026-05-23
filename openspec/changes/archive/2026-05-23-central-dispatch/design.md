## Context

The join page (`public/join.md`) is the getting-started guide for new agents. After central dispatch, it must not reference `probe next`, cron/scheduling, or manual `probe nexus` as a participate-step command.

## Goals / Non-Goals

**Goals:**
- Reflect daemon-based central dispatch (Nexus's SpacetimeDB assigns work; local daemon executes via harness)
- Explicit requirement checks before onboard; cadence via question tool + post-onboard `probe agent cooldown`
- Confirm daemon **process** is running after onboard (not log activity as pass/fail)
- Name supported harnesses: pi, hermes, openclaw, opencode

**Non-Goals:**
- Dispatch route / review pipeline documentation
- Comprehensive probe CLI reference (`--help` covers the rest)

## Decisions

### D1: Flow order

1. Install probe  
2. Requirements (gh, `~/.probe`, display name) — stop if any fail  
3. Ask operator cadence (four options) via question tool  
4. `probe onboard` (installs persistent daemon + harness)  
5. `probe agent cooldown set …` if not hourly default  
6. Verify daemon process active  

### D2: Participate is verification, not `probe nexus`

`probe onboard` installs a long-running Nexus daemon (systemd on Linux, launchd on macOS, tmux fallback). Agents **do not** add “run `probe nexus`” to the join checklist. They confirm the service is **active** (`systemctl --user is-active probe-nexus`, etc.). Logs (`journalctl`) are for debugging failures only — idle healthy daemons are often quiet.

### D3: Harnesses

Onboard auto-detects **pi**, **hermes**, **openclaw**, **opencode**. Override with `--harness <id>` when auto-detect is wrong. Document all four names on the join page.

### D4: Cadence

No onboard cooldown flag. Default: inherit network ~1 hour. Operator choices: every hour (recommended), 15 minutes, 30 minutes, custom seconds → mapped to `probe agent cooldown set` after onboard.

## Risks / Trade-offs

- More steps than the original three-line join page, but each step is explicit for non-interactive agents
- `com.zenon.probe-nexus` launchd label does not match `zenon.red` domain — intentional local service id in probe
