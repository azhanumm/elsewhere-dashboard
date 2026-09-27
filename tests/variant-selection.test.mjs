import test from 'node:test';
import assert from 'node:assert/strict';
import { getCompatibleOptionValues, findMatchingVariant, getOptionValues, normalizeVariantOptions, variantNameMatchesOptions } from '../lib/variant-selection.js';

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

await test('either option dimension can be used on its own', () => {
  const option1Only = [
    { id: 'volume-30', option1_value: '30ml', option2_value: null },
    { id: 'volume-15', option1_value: '15ml', option2_value: null },
  ];
  const option2Only = [
    { id: 'size-s', option1_value: null, option2_value: 'S' },
    { id: 'size-m', option1_value: null, option2_value: 'M' },
  ];

  assert.equal(findMatchingVariant(option1Only, '30ml', '')?.id, 'volume-30');
  assert.equal(findMatchingVariant(option2Only, '', 'M')?.id, 'size-m');
});

await test('legacy and new one-dimensional variants share one option group', () => {
  const normalized = normalizeVariantOptions([
    { id: 'new', name: 'Bpop Cola', option1_value: 'Bpop Cola', option2_value: null },
    { id: 'legacy-null', name: 'Dark Chocolate 65g', option1_value: null, option2_value: null },
    { id: 'legacy-blank', name: 'Milk Chocolate 180g', option1_value: '  ', option2_value: '' },
  ]);

  assert.deepEqual(
    normalized.map((variant) => variant.option1_value),
    ['Bpop Cola', 'Dark Chocolate 65g', 'Milk Chocolate 180g'],
  );
  assert.deepEqual(getOptionValues(normalized, 'option2_value'), []);
});

await test('normalization preserves products with two real option dimensions', () => {
  const [normalized] = normalizeVariantOptions([
    { id: 'two-dimensions', name: 'Blue / M', option1_value: ' Blue ', option2_value: ' M ' },
  ]);
  assert.equal(normalized.option1_value, 'Blue');
  assert.equal(normalized.option2_value, 'M');
});

await test('legacy combined names can be matched to a new two-dimension combination', () => {
  assert.equal(variantNameMatchesOptions('CaramelCrisp — Large Bag', 'Large Bag', 'Caramel Crisp'), true);
  assert.equal(variantNameMatchesOptions('Chicago Mix — Petite Tin', 'Petite Tin', 'Chicago Mix'), true);
  assert.equal(variantNameMatchesOptions('CheeseCorn — Medium Bag', 'Small Bag', 'Cheese Corn'), false);
});
