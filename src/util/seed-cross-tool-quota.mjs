/**
 * seed-cross-tool-quota.mjs
 *
 * One-time migration that seeds `_xt: { c: 0 }` on the `monsters` host
 * for every existing user. After this lands, every user has the
 * cross-tool quota field in storage — which means the cross-tool gate
 * can safely use `recoverAtCount` to soft-recover at-cap when `_xt`
 * is missing on a host that has user data: any such absence after
 * migration must be manual deletion (tampering), not the "never
 * generated cross-tool before" case.
 *
 * Idempotent: `ensureQuotaSeeded` is a no-op when the field already
 * exists, so re-running the migration (e.g., post-import via
 * DataManagerModal) doesn't reset anyone's counter.
 *
 * Why this exists as a separate migration rather than a deletion
 * detection rule: we can't distinguish "user is fresh, no quota yet"
 * from "user deleted `_xt`" once both look the same at read time.
 * Seeding ahead of any gate check creates a known-good baseline so
 * future absences are unambiguously deletions.
 */

import { ensureQuotaSeeded } from './quota-storage.mjs';

export async function seedCrossToolQuota() {
  await ensureQuotaSeeded('cross-tool');
}
