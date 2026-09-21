export function getOptionValues(variants, optionKey) {
  return [...new Set(variants.map((variant) => variant[optionKey]).filter(Boolean))];
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
