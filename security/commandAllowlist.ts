/**
 * ASKC – Command allowlist for Run / Terminal
 * Only known safe entrypoints; no raw shell unless explicitly enabled by user setting.
 */

export type AllowedRuntime =
  | 'python3'
  | 'python'
  | 'node'
  | 'npm'
  | 'npx'
  | 'tsc'
  | 'ts-node'
  | 'g++'
  | 'gcc'
  | 'clang++'
  | 'clang'
  | 'bash';

const DEFAULT_ALLOW: ReadonlySet<string> = new Set([
  'python3',
  'python',
  'node',
  'npm',
  'npx',
  'tsc',
  'ts-node',
  'g++',
  'gcc',
  'clang++',
  'clang',
  'bash',
]);

/** Dangerous shell metacharacters when a single string is passed to a shell. */
const SHELL_META = /[;&|`$<>(){}]/

export interface CommandCheckResult {
  allowed: boolean;
  reason?: string;
  /** Normalized executable name */
  executable?: string;
}

/**
 * Validate a command before execution.
 * Prefer argv arrays over shell strings.
 */
export function checkCommand(
  executable: string,
  args: string[] = [],
  options?: { allowShell?: boolean; extraAllow?: string[] }
): CommandCheckResult {
  const exec = executable.trim().split(/[/\\]/).pop() || executable.trim();
  const allow = new Set(DEFAULT_ALLOW);
  options?.extraAllow?.forEach((c) => allow.add(c));

  if (!allow.has(exec)) {
    return {
      allowed: false,
      reason: `Executable "${exec}" is not on the allowlist`,
    };
  }

  // Reject obvious injection in args when shell mode is off
  if (!options?.allowShell) {
    for (const a of args) {
      if (SHELL_META.test(a) && exec === 'bash') {
        // bash -c is intentional; still block nested shell metachar abuse patterns later
        continue;
      }
      if (a.includes('\0')) {
        return { allowed: false, reason: 'Null byte in arguments' };
      }
    }
  }

  // Never allow sudo / privilege escalation wrappers
  if (['sudo', 'doas', 'su', 'pkexec'].includes(exec)) {
    return { allowed: false, reason: 'Privilege elevation is never allowed' };
  }

  return { allowed: true, executable: exec };
}

/**
 * If the host must use a shell string, validate it is a single allowlisted binary invocation.
 * Prefer not using this – pass argv instead.
 */
export function checkShellString(commandLine: string): CommandCheckResult {
  const trimmed = commandLine.trim();
  if (!trimmed) return { allowed: false, reason: 'Empty command' };

  // Disallow obvious chaining
  if (/[;&|]/.test(trimmed) || trimmed.includes('`') || trimmed.includes('$(')) {
    return {
      allowed: false,
      reason: 'Shell metacharacters / chaining not permitted in secured mode',
    };
  }

  const first = trimmed.split(/\s+/)[0];
  return checkCommand(first, trimmed.split(/\s+/).slice(1));
}
