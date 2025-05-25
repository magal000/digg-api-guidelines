module.exports = (targetVal) => {
  if (!Array.isArray(targetVal)) return [];

  const hasLimit = targetVal.some(p => p.in === 'query' && p.name === 'limit');
  const hasPage = targetVal.some(p => p.in === 'query' && p.name === 'page');
  const hasOffset = targetVal.some(p => p.in === 'query' && p.name === 'offset');

  if ((hasPage || hasOffset) && !hasLimit) {
    return [{ message: "Vid användande av paginering, SKALL 'limit' finnas tillsammans med 'page' eller 'offset'" }];
  }

  return [];
};
