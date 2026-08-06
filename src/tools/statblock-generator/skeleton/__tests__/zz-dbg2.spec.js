import { buildSkeleton } from '@/tools/statblock-generator/skeleton/build-skeleton.mjs';
test('debug', () => {
  buildSkeleton({ cr: 20, seed: 8, signatureMechanic: 'engulf' });
});
