module.exports = (targetVal) => {
  if (targetVal && typeof targetVal === 'object' && 'requestBody' in targetVal) {
    return [
      {
        message: 'EN GET -förfrågan SKALL INTE acceptera en body',
        path: ['requestBody']
      }
    ];
  }

  return [];
};
