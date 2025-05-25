module.exports = (targetVal) => {
  if (typeof targetVal !== 'object' || targetVal === null) {
    return [];
  }

  if (targetVal.type === 'object' && targetVal.properties) {
    return [
      {
        message: 'Om en header använder nästlade strukturer, är en requestbody mer lämplig.',
      },
    ];
  }

  return [];
};
