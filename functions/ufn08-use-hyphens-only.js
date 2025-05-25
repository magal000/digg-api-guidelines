module.exports = (targetVal) => {
  const segments = targetVal.split('/').filter(Boolean);
  const nonParamSegments = segments.filter((s) => !s.startsWith('{'));

  for (const segment of nonParamSegments) {
    if (/[,._~]/.test(segment) || segment.startsWith('-') || segment.endsWith('-') || segment.includes('--')) {
      return [{
        message: "Endast '-' SKALL användas som avgränsare i URL-vägar.",
      }];
    }
  }

  return [];
};
