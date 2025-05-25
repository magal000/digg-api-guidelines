module.exports = (targetVal) => {
  if (!targetVal || !targetVal.description || targetVal.description.toString().trim() === '') {
    return [
      {
        message: 'Varje operation i paths bör innehålla en beskrivning (description).',
      },
    ];
  }

  return [];
};
