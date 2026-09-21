import test from 'node:test';
import assert from 'node:assert/strict';
import { getCompatibleOptionValues, findMatchingVariant } from '../lib/variant-selection.js';

const variants = [
  { id: 'v1', option1_value: 'Violeta', option2_value: 'XXS' },
  { id: 'v2', option1_value: 'Violeta', option2_value: 'XS' },
  { id: 'v3', option1_value: 'Serenata', option2_value: 'XS' },
  { id: 'v4', option1_value: 'Serenata', option2_value: 'S' },
  { id: 'v5', option1_value: 'Serenata', option2_value: 'XL' },
];

await test('compatible sizes only appear for the selected colourway', () => {
  assert.deepEqual(getCompatibleOptionValues(variants, 'Serenata', 'option2_value'), ['XS', 'S', 'XL']);
  assert.deepEqual(getCompatibleOptionValues(variants, 'Violeta', 'option2_value'), ['XXS', 'XS']);
});

await test('invalid size combinations are rejected instead of falling back to another colourway', () => {
  assert.equal(findMatchingVariant(variants, 'Serenata', 'XL')?.id, 'v5');
  assert.equal(findMatchingVariant(variants, 'Serenata', 'M'), null);
});
