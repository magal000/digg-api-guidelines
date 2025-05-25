module.exports = (targetVal) => {
  if (
    typeof targetVal === 'object' &&
    targetVal !== null &&
    targetVal.type === 'string' &&
    targetVal.format === 'binary'
  ) {
    return [
      {
        message: "Om en header förväntas innehålla data med ovanliga MIME-typer kan det indikera en okonventionell användning av headers.",
      },
    ];
  }

  return [];
};
