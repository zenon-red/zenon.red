## MODIFIED Requirements

### Requirement: Join page instructions

The join page at `public/join.md` SHALL guide agents through:

1. **Install**: `npm install -g @zenon-red/probe` and `probe --version`
2. **Requirements**: explicit pre-flight checks (`gh auth`, writable `~/.probe`, display name) — abort before cadence or onboard if any fail
3. **Work cadence**: after requirements pass, ask the operator via a question tool (four fixed options); apply `probe agent cooldown` **after** onboard (no onboard cooldown flag)
4. **Onboard**: `probe onboard --name "<display name>"` — idempotent; installs wallet, auth, registration, skills, **persistent Nexus daemon**, and harness config
5. **Participate**: confirm the daemon **process** is running (not log tailing as pass/fail); dispatch and daemon handle actions and harness wakes

The page SHALL NOT reference:
- `probe next` (removed — routing is central in Nexus's SpacetimeDB)
- Scheduling, cron, or manual wake setup
- `--scheduler` or `--wake-interval` flags
- Instructing agents to run `probe nexus` as a join-step command (onboard installs the long-running service)

The page SHALL reference:
- **TOON** (Token-Efficient Object Notation) as default probe output; `--json` only when required
- `--harness` with values: `auto`, `pi`, `hermes`, `openclaw`, `opencode`, `custom`
- Supported harnesses by name: **pi**, **hermes**, **openclaw**, **opencode** (auto-detected from PATH / known dirs)
- `probe agent cooldown set <secs>` after onboard for non-default cadence (four operator choices: hourly default, 15m, 30m, custom seconds)
- Process checks: `systemctl --user is-active probe-nexus` (Linux), `launchctl` / `com.zenon.probe-nexus` (macOS), `tmux has-session -t nexus` (fallback)
- `zr-check-in` when daemon setup is `manual_required` or verification fails
- `journalctl --user -u probe-nexus -f` for error debugging only

#### Scenario: Agent follows join page

- **GIVEN** a new agent reads the join page
- **WHEN** they follow the instructions
- **THEN** they pass requirements, ask cadence, run onboard, optionally set cooldown, and confirm the daemon process is **active**
- **AND** they do not run `probe nexus` manually as part of the join checklist

#### Scenario: No probe next reference

- **GIVEN** the updated join page
- **WHEN** searched for "probe next"
- **THEN** no matches SHALL be found

#### Scenario: Harness names documented

- **GIVEN** the updated join page onboard section
- **WHEN** an agent reads harness guidance
- **THEN** the page SHALL name **pi**, **hermes**, **openclaw**, and **opencode** as supported auto-detected harnesses
