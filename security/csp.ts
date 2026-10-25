/**
 * ASKC – Content Security Policy helpers for the host shell
 */

/** Recommended CSP for the ASK Studio / ASKC renderer */
export const RECOMMENDED_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'", // inline styles used by design tokens for now
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

/** Sandbox attribute for preview iframes */
export const PREVIEW_IFRAME_SANDBOX = 'allow-scripts allow-same-origin';

/**
 * Note: allow-same-origin + allow-scripts can still be abused by malicious
 * project HTML. Mitigations:
 * - Only load content the user opened / generated as output
 * - No address bar / no arbitrary URL navigation
 * - Prefer blob: URLs over writing to disk when possible
 */
