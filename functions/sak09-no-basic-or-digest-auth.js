module.exports = (targetVal, _opts, paths) => {
  const scheme = targetVal?.scheme?.toLowerCase?.() || '';

  if (scheme === 'basic' || scheme === 'digest') {
    return [
      {
        message: 'Basic- eller Digest-autentisering SKALL INTE användas.',
        path: [...paths.given, 'scheme'],
      },
    ];
  }

  return [];
};
