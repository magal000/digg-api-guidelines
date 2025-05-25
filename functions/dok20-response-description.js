module.exports = (targetVal) => {
  if (!targetVal || !targetVal.description || targetVal.description.toString().trim() === '') {
    return [
      {
        message: 'Response-schemat saknar beskrivning. Returkoder SKALL dokumenteras tydligt.',
      },
    ];
  }

  return [];
};
