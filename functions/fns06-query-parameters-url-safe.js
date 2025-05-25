module.exports = (targetVal) => {
  const regex = /^[a-zA-Z0-9\-._~]+$/;
  return regex.test(targetVal)
    ? []
    : [{ message: 'Sökparametrar BÖR använda URL-säkra tecken (RFC 3986)' }];
};
