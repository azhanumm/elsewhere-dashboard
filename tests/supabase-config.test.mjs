import test from 'node:test';
import assert from 'node:assert/strict';
import { isSupabaseConfigured } from '../lib/supabase.ts';

test('local preview mode is used when Supabase credentials are missing', () => {
  assert.equal(isSupabaseConfigured(undefined, undefined), false);
  assert.equal(
    isSupabaseConfigured('https://example.supabase.co', 'anon-key'),
    true,
  );
});
