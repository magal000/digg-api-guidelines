module.exports = (targetVal) => {
  if (!targetVal || typeof targetVal !== 'object') return [];

  const violations = [];

  for (const key in targetVal) {
    const val = targetVal[key];
    if (
      typeof val === 'object' &&
      val.example &&
      typeof val.example === 'string'
    ) {
      const example = val.example;
      const hasZulu = example.endsWith('Z');
      const hasOffset = /[+-]\d{2}:\d{2}$/.test(example);

      if (!hasZulu && !hasOffset) {
        violations.push({
          message: `Fältet "${key}" har exempel utan tydlig tidszon. Enligt RFC 3339 BÖR tidszonen anges.`,
          path: [key, 'example'],
        });
      }
    }
  }

  return violations;
};
