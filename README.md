# ASKC – ASK Studio (Secured)

Security-hardened core for **ASK Studio**.

**Full application** (editor, project folder, run/terminal, preview, themes) is packaged for share/download as:

- `ask-studio-0.1.0.zip` — complete unified project  
- Folder layout: `apps/` · `packages/` · `security/` · `docs/`

This GitHub repository holds the **secured core** so security can be reviewed independently.

## Secured core contents

| Path | Purpose |
|------|---------|
| `SECURITY.md` | Threat model & non-negotiable rules |
| `security/pathSandbox.ts` | Project-root path confinement |
| `security/commandAllowlist.ts` | Runtime allowlist; no shell chaining |
| `security/secureFs.ts` | FS wrapper rejecting path escape |
| `security/csp.ts` | CSP + preview iframe sandbox |
| `docs/IMPROVEMENTS.md` | Product improvement roadmap |

## Use

```ts
import {
  createSecureFs,
  checkCommand,
  RECOMMENDED_CSP,
  PREVIEW_IFRAME_SANDBOX,
} from './security';

const secureFs = createSecureFs(rawFs, projectRoot);
const check = checkCommand('python3', ['main.py']);
if (!check.allowed) throw new Error(check.reason);
```

## Standard software baseline (0.1.0)

- Versioned release + changelog
- LICENSE / CONTRIBUTING / SECURITY
- Modular packages under a single tree for easy download
- Light/dark theme + responsive UI in the full app package
- Explicit security controls for FS and process execution

## License

See [LICENSE](LICENSE).
