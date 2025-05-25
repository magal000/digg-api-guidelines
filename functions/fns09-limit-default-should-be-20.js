module.exports = (targetVal) => {
  if (!Array.isArray(targetVal)) return [];

  const pageOrOffset = targetVal.find(p =>
    p.in === 'query' && (p.name === 'page' || p.name === 'offset')
  );
  const limit = targetVal.find(p =>
    p.in === 'query' && p.name === 'limit'
  );

  if (pageOrOffset && limit) {
    return limit.schema?.default === 20
      ? []
      : [{ message: "Defaultvärde för 'limit' BÖR vara 20" }];
  }

  return [];
};
