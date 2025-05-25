module.exports = (targetVal) => {
  if (
    typeof targetVal === 'object' &&
    targetVal !== null &&
    targetVal.type === 'object'
  ) {
    return [
      {
        message: "Om en header innehåller komplexa datastrukturer, såsom JSON eller XML, kan det indikera en okonventionell användning av headers.",
      },
    ];
  }

  return [];
};
