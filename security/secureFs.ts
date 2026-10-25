/**
 * ASKC – Secure filesystem wrapper
 * Wraps any FileSystemAdapter and enforces project-root confinement.
 */

import { resolveInRoot, isInsideRoot, PathEscapeError } from './pathSandbox';

export interface MinimalFs {
  readDir(path: string): Promise<{ name: string; isDirectory: boolean; size?: number }[]>;
  readFile(path: string): Promise<Uint8Array | string>;
  writeFile(path: string, content: string | Uint8Array): Promise<void>;
  mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
  exists(path: string): Promise<boolean>;
  join(...parts: string[]): string;
  basename(path: string): string;
  dirname(path: string): string;
  relative(from: string, to: string): string;
  isAbsolute(path: string): boolean;
}

export function createSecureFs(inner: MinimalFs, projectRoot: string): MinimalFs {
  const root = projectRoot.replace(/\\/g, '/').replace(/\/+$/, '');

  const guard = (absOrRel: string): string => {
    if (inner.isAbsolute(absOrRel)) {
      if (!isInsideRoot(root, absOrRel.replace(/\\/g, '/'))) {
        throw new PathEscapeError('Absolute path outside project root');
      }
      return absOrRel;
    }
    return resolveInRoot(root, absOrRel);
  };

  return {
    readDir: (path) => inner.readDir(guard(path)),
    readFile: (path) => inner.readFile(guard(path)),
    writeFile: (path, content) => inner.writeFile(guard(path), content),
    mkdir: (path, options) => inner.mkdir(guard(path), options),
    exists: (path) => inner.exists(guard(path)),
    join: (...parts) => inner.join(...parts),
    basename: (path) => inner.basename(path),
    dirname: (path) => inner.dirname(path),
    relative: (from, to) => inner.relative(from, to),
    isAbsolute: (path) => inner.isAbsolute(path),
  };
}
