module.exports = (targetVal) => {
  if (!targetVal || !targetVal.name || targetVal.name.toString().trim() === '') {
    return [{
      message: 'Contact-objektet saknar "name".'
    }];
  }
  return [];
};
