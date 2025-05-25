module.exports = (targetVal) => {
  if (!targetVal || !targetVal.url || targetVal.url.toString().trim() === '') {
    return [{
      message: 'Contact-objektet saknar "url".'
    }];
  }
  return [];
};
