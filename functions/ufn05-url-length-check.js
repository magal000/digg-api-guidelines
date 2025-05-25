module.exports = (targetVal) => {
  if (typeof targetVal !== 'string') return [];

  return targetVal.length > 2048
    ? [{
        message: 'URL- eller sökvägslängd överskrider 2048 tecken.',
      }]
    : [];
};
