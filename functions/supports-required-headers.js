const requiredHeaders = ['Accept', 'Date', 'Cache-Control', 'ETag', 'Connection', 'Cookie'];

module.exports = (targetVal) => {
  if (!targetVal.parameters || !Array.isArray(targetVal.parameters)) {
    return [];
  }

  const headers = targetVal.parameters
    .filter(p => p.in === 'header' || p.in === 'cookie')
    .map(p => p.name);

  const missing = requiredHeaders.filter(h => !headers.includes(h));

  if (missing.length > 0) {
    return [
      {
        message: `Följande headers saknas: ${missing.join(', ')}`,
      },
    ];
  }

  return [];
};
