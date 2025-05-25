module.exports = (targetVal) => {
  const url = typeof targetVal === 'string' ? targetVal.replace(/:\d+/, '').replace(/{[^}]+}/g, '') : '';
  const pattern = /^[a-z0-9\/\-,.~]+$/;

  return pattern.test(url)
    ? []
    : [{
        message: 'URL:n SKALL använda endast tecken enligt RFC 3986: a-z, 0-9, "-", ".", "~".',
      }];
};
