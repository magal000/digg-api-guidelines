module.exports = (targetVal) => {
  if (!targetVal || !targetVal.license) {
    return [{
      message: 'info-objektet saknar "license".'
    }];
  }
  return [];
};
