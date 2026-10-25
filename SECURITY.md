# ASK Studio Secured (ASKC) – Security Model

This package is the **security-hardened** line of ASK Studio intended for the **ASKC** repository.

## Threat model (summary)

| Asset | Risk | Control |
|-------|------|---------|
| User project files | Read/write outside project root | Path sandbox – all paths resolved & confined to project root |
| Shell / run commands | Arbitrary command execution | Allowlist of runtimes + argument sanitization; no shell interpolation by default |
| Extensions | Malicious package / privilege abuse | Manifest validation, explicit permission consent, no silent elevation |
| Preview HTML | XSS / navigation escape | Sandboxed iframe (`allow-scripts allow-same-origin` only; no top-navigation) |
| Toolchain install | System-level install without consent | Always require user approval; never auto-elevate |
| AutoFix | Destructive or high-risk edits | Policy caps (Balanced default); snapshots + rollback |

## Non-negotiable rules

1. **Never** silently elevate privileges (no auto `sudo`, no silent system package installs).
2. **Never** execute commands built by string-concatenating untrusted input into a shell without an allowlist path.
3. **Always** confine file I/O to the opened project root (reject `..` escape).
4. **Always** show extension permissions before activation.
5. **Always** prefer explicit user consent for network + run-commands together.
6. Preview content is **project/output only** — no general-purpose browser, no arbitrary URL bar.

## Default policy

- AutoFix: **Balanced** (medium risk auto; high risk requires approval; system tools never silent).
- Extensions: reject malformed manifests; consent required.
- Run: only detected/allowlisted toolchains unless user explicitly configures more.

## Reporting

Treat this as a development tool. Do not run untrusted projects with elevated OS permissions.
