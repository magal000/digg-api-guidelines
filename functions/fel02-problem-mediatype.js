module.exports = (targetVal) => {
  const hasJson = !!targetVal?.['application/problem+json'];
  const hasXml = !!targetVal?.['application/problem+xml'];

  if (!hasJson && !hasXml) {
    return [{
      message: 'Felhantering bör använda mediatypen "application/problem+json" eller "application/problem+xml".'
    }];
  }

  return [];
};
