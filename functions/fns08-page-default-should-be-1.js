module.exports = (targetVal) => {
  if (!Array.isArray(targetVal)) return [];

  const pageParam = targetVal.find(p => p.in === 'query' && p.name === 'page');
  const limitParam = targetVal.find(p => p.in === 'query' && p.name === 'limit');

  if (pageParam && limitParam) {
    const defaultVal = pageParam.schema?.default;
    return defaultVal !== 1
      ? [{ message: "'page' SKALL alltid starta med värde 1" }]
      : [];
  }

  return [];
};
