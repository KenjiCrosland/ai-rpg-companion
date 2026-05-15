/**
 * Catchall-only register character-name whitelists.
 *
 * Status: thin shim — the catchall prompt builder no longer injects
 * the whitelist itself (see `catchall-prompt.mjs` docstring). The
 * dedicated character-whitelist block in
 * `character-whitelist-prompt.mjs` is the universal injector. This
 * file survives as a compat layer for existing tests and any external
 * caller; the data derives from `ALL_REGISTERS` so adding a whitelist
 * to a catchall register (by setting `characterPool` on its entry)
 * surfaces here automatically.
 *
 * See `src/shared/registers/ARCHITECTURE.md` for the full
 * architectural rationale (epithets-not-given-names, sacred-boundary
 * commitment, residual-risk acknowledgment).
 */

import { ALL_REGISTERS } from '@/shared/registers/index.mjs';

export const registerCharacterEpithetWhitelists = Object.fromEntries(
  ALL_REGISTERS
    .filter(r => r.promptArchitecture === 'catchall' && Array.isArray(r.characterPool))
    .map(r => [r.prefix, r.characterPool]),
);

/**
 * Look up the whitelist for a given selected register. Returns the
 * array of epithet strings if a whitelist exists for this register, or
 * null if the register has no whitelist.
 */
export function getWhitelistForRegister(selectedRegister) {
  if (typeof selectedRegister !== 'string') return null;
  for (const [prefix, list] of Object.entries(registerCharacterEpithetWhitelists)) {
    if (selectedRegister.startsWith(prefix)) return list;
  }
  return null;
}
