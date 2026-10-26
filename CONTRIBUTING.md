# Contributing

## Secured core rules

- Do not weaken path sandbox or command allowlist checks
- Never add silent privilege elevation
- Prefer argv-based process execution over shell strings
- Document threat-model impact in PRs that touch `security/`

## Development

This repo is the ASKC secured package. The full ASK Studio application (UI modules + app shell) is distributed as the `ask-studio-0.1.0` release package.
