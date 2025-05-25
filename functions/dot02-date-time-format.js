module.exports = (targetVal) => {
  if (!targetVal || typeof targetVal !== 'object') return [];

  const violations = [];

  for (const key in targetVal) {
    const val = targetVal[key];
    if (
      typeof val === 'object' &&
      val.example &&
      typeof val.example === 'string' &&
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(val.example)
    ) {
      violations.push({
        message: `Fältet "${key}" har ett ogiltigt exempel. Datum och tid SKALL anges enligt RFC 3339.`,
        path: [key, 'example'],
      });
    }
  }

  return violations;
};
