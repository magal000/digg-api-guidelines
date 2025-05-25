module.exports = (targetVal) => {
  if (!targetVal || typeof targetVal.description !== 'string' || targetVal.description.trim() === '') {
    return [
      {
        message: 'info-objektet saknar "description". Det bör finnas en övergripande beskrivning av API:et.',
      },
    ];
  }

  return [];
};
