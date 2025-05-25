module.exports = (targetVal) => {
  const httpsPattern = /^https:\/\/[^:\/]+(?::443)?(\/|$)/;

  return httpsPattern.test(targetVal)
    ? []
    : [{
        message: 'Alla API:er SKALL exponeras via HTTPS på port 443.',
      }];
};
