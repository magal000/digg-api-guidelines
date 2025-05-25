module.exports = (targetVal) => {
  if (!targetVal || typeof targetVal !== 'object') return [];

  const keys = Object.keys(targetVal);
  if (keys.includes('schema')) {
    return [];
  }

  return [
    {
      message: 'RequestBody application/json saknar ett schema-objekt enligt regel DOK.15.',
    },
  ];
};
