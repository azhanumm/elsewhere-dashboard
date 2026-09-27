export function getOptionValues(variants, optionKey) {
  return [...new Set(variants.map((variant) => variant[optionKey]).filter(Boolean))];
}

export function normalizeVariantOptions(variants) {
  return variants.map((variant) => {
    const option1Value = typeof variant.option1_value === 'string' ? variant.option1_value.trim() : '';
    const option2Value = typeof variant.option2_value === 'string' ? variant.option2_value.trim() : '';
    if (option1Value || option2Value) {
      return {
        ...variant,
        option1_value: option1Value || null,
        option2_value: option2Value || null,
      };
    }

    const legacyName = typeof variant.name === 'string' ? variant.name.trim() : '';
    return {
      ...variant,
      option1_value: legacyName || null,
      option2_value: null,
    };
  });
}

function canonicalizeOptionText(value) {
  return String(value ?? '').toLocaleLowerCase().replace(/[^a-z0-9]+/g, '');
}

export function variantNameMatchesOptions(variantName, ...optionValues) {
  const canonicalName = canonicalizeOptionText(variantName);
  const canonicalOptions = optionValues.map(canonicalizeOptionText).filter(Boolean);
  return Boolean(canonicalName) && canonicalOptions.length > 0 && canonicalOptions.every((option) => canonicalName.includes(option));
}

export function getCompatibleOptionValues(variants, filterKeyOrValue, filterValueOrKey, maybeOptionKey) {
  if (typeof filterValueOrKey === 'string' && maybeOptionKey) {
    const filterKey = filterKeyOrValue;
    const filterValue = filterValueOrKey;
    const optionKey = maybeOptionKey;
    const matches = filterValue ? variants.filter((variant) => variant[filterKey] === filterValue) : variants;
    return [...new Set(matches.map((variant) => variant[optionKey]).filter(Boolean))];
  }

  const optionValue = filterKeyOrValue;
  const optionKey = filterValueOrKey;
  const matches = optionValue ? variants.filter((variant) => variant.option1_value === optionValue) : variants;
  return [...new Set(matches.map((variant) => variant[optionKey]).filter(Boolean))];
}

export function findMatchingVariant(variants, option1Value, option2Value) {
  if (!option1Value && !option2Value) return variants[0] || null;
  return (
    variants.find((variant) => {
      const variantOption1 = variant.option1_value ?? '';
      const variantOption2 = variant.option2_value ?? '';
      return variantOption1 === (option1Value ?? '') && variantOption2 === (option2Value ?? '');
    }) || null
  );
}
