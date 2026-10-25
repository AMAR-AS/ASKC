/**
 * ASKC – Path sandbox
 * Ensures every file path stays inside the project root.
 */

export class PathEscapeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PathEscapeError';
  }
}

/** Normalize separators and collapse redundant segments without resolving symlinks. */
export function normalizeRelative(rel: string): string {
  const parts = rel.replace(/\\/g, '/').split('/');
  const out: string[] = [];
  for (const p of parts) {
    if (!p || p === '.') continue;
    if (p === '..') {
      if (out.length === 0) {
        throw new PathEscapeError('Path escapes project root: ' + rel);
      }
      out.pop();
      continue;
    }
    // Reject null bytes and weird control chars in path segments
    if (/[\x00-\x1f]/.test(p)) {
      throw new PathEscapeError('Illegal characters in path segment');
    }
    out.push(p);
  }
  return out.join('/');
}

/**
 * Join project root + relative path and verify the result is still under root.
 * `root` and result use forward slashes for comparison.
 */
export function resolveInRoot(root: string, relativePath: string): string {
  const rootN = root.replace(/\\/g, '/').replace(/\/+$/, '');
  const rel = normalizeRelative(relativePath);
  const full = rel ? `${rootN}/${rel}` : rootN;

  // Ensure full is exactly root or root + '/'
  if (full !== rootN && !full.startsWith(rootN + '/')) {
    throw new PathEscapeError('Resolved path outside project root');
  }
  return full;
}

/** True if candidate absolute path is inside root. */
export function isInsideRoot(root: string, absolutePath: string): boolean {
  try {
    const rootN = root.replace(/\\/g, '/').replace(/\/+$/, '');
    const absN = absolutePath.replace(/\\/g, '/');
    return absN === rootN || absN.startsWith(rootN + '/');
  } catch {
    return false;
  }
}
