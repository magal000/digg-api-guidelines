module.exports = (targetVal) => {
  if (!targetVal || !targetVal.name || targetVal.name.toString().trim() === '') {
    return [{
      message: 'License-objektet saknar "name".'
    }];
  }
  return [];
};
