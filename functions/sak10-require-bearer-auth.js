module.exports = (targetVal, _opts, paths) => {
  const scheme = targetVal?.scheme?.toLowerCase?.() || '';

  if (scheme !== 'bearer') {
    return [
      {
        message: 'Authorization: Bearer header SKALL användas för autentisering/auktorisation.',
        path: [...paths.given, 'scheme'],
      },
    ];
  }

  return [];
};
