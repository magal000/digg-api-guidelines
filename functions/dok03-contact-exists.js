module.exports = (targetVal) => {
  if (!targetVal || !targetVal.contact) {
    return [{
      message: 'info-objektet saknar "contact".'
    }];
  }
  return [];
};
