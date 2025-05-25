module.exports = (targetVal) => {
  const requiredFields = ['title', 'version', 'description', 'termsOfService', 'contact', 'license'];
  const missing = requiredFields.filter((field) => !targetVal || !targetVal[field]);

  if (missing.length > 0) {
    return [
      {
        message: `Saknar fält i info-objektet: ${missing.join(', ')}`,
      },
    ];
  }

  return [];
};
