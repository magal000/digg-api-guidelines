module.exports = (targetVal) => {
  if (typeof targetVal !== 'string') return [];

  const segments = targetVal.split('/').filter(Boolean);
  const versionRegex = /^v[0-9]+$/;

  const hasValidVersion = segments.some((seg) => versionRegex.test(seg));

  return hasValidVersion
    ? []
    : [{
        message: "Version BÖR anges i URL enligt formatet 'v[x]' där x är ett heltal.",
      }];
};
