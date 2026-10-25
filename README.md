# ASKC – ASK Studio (Secured)

Security-hardened line of **ASK Studio** for the [ASKC](https://github.com/AMAR-AS/ASKC) repository.

This package does **not** replace the full product modules. It adds enforceable security controls that hosts should use when wiring file system, run/terminal, preview, extensions, and AutoFix.

## What’s included

| Path | Purpose |
|------|---------|
| `SECURITY.md` | Threat model & non-negotiable rules |
| `security/pathSandbox.ts` | Project-root path confinement |
| `security/commandAllowlist.ts` | Runtime / command allowlist (no silent shell chaining) |
| `security/secureFs.ts` | FS adapter wrapper that rejects path escape |
| `security/csp.ts` | Recommended CSP + preview iframe sandbox |
| `docs/IMPROVEMENTS.md` | Roadmap of further product improvements |

## Quick use

```ts
import {
  createSecureFs,
  checkCommand,
  resolveInRoot,
  RECOMMENDED_CSP,
  PREVIEW_IFRAME_SANDBOX,
} from './security';

// Confine FS to project root
const secureFs = createSecureFs(rawFs, projectRoot);

// Before any run:
const check = checkCommand('python3', ['main.py']);
if (!check.allowed) throw new Error(check.reason);

// Preview iframe:
// <iframe sandbox={PREVIEW_IFRAME_SANDBOX} srcDoc={html} />
```

## Relationship to full ASK Studio

The complete product lives in the development workspace with modules:

- Project Folder · Code Editor · Suggest · Run/Terminal · Preview Browser  
- AutoFix (Balanced) · Toolchain · Extensions · Shared design system  

**ASKC** holds the **secured core** and security policy so it can be versioned and reviewed independently.

## License

UNLICENSED / private unless otherwise stated by the repository owner.
