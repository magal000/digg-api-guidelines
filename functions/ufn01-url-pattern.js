module.exports = (targetVal) => {
  const regex = new RegExp(
    '^(https?:\\/\\/)?' +                  // protocol
    '([^\\/]+\\/)' +                       // host
    '([^\\/]+\\/)' +                       // api
    '(v[0-9]+)' +                          // version
    '(\\/)?$'                              // optional trailing slash
  );

  return regex.test(targetVal)
    ? []
    : [{
        message: 'URL följer inte standardformatet: {protokoll}://{domännamn}/{api}/{version}',
      }];
};
