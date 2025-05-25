module.exports = (targetVal, _opts, paths) => {
  const value = typeof targetVal === 'string' ? targetVal : '';

  if (value.startsWith('http:')) {
    return [
      {
        message: 'OAuth URL BÖR använda HTTPS.',
        path: paths.given,
      },
    ];
  }

  return [];
};
