/**
 * seed-monster-quotas.mjs
 *
 * One-time migration that seeds `_q` (statblock), `_qh` (quest-hook),
 * and `_lr` (lore) quota fields on the `monsters` host for every
 * existing user. After this lands, every user has all three quota
 * fields in storage — which means the gates can safely use
 * `recoverAtCount` to soft-recover at-cap when a field is missing on
 * a host that has user data: any such absence after migration must be
 * manual deletion (tampering), not the "never generated before" case.
 *
 * Parallel to seed-cross-tool-quota (which covers `_xt`). The
 * cross-tool field was seeded earlier; this migration extends the same
 * baseline-creation guarantee to the three monster-domain gates.
 *
 * Why this matters in practice: production reports of users hitting a
 * statblock limit when they shouldn't (no `_q` present, host has saved
 * monsters, gate's `recoverAtCount` fires and soft-recovers to at-cap)
 * trace back to this gap — `_q` was never seeded for users created
 * before the gate's soft-recovery branch existed.
 *
 * Idempotent: `ensureQuotaSeeded` is a no-op when the field already
 * exists, so re-running the migration doesn't reset anyone's counter.
 */

import { ensureQuotaSeeded } from './quota-storage.mjs';

export async function seedMonsterQuotas() {
  await ensureQuotaSeeded('statblock');
  await ensureQuotaSeeded('quest-hook');
  await ensureQuotaSeeded('lore');
}
