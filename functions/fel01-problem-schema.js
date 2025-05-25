module.exports = (targetVal) => {
  const mandatory = ['type', 'title', 'status', 'detail', 'instance'];

  if (!targetVal || typeof targetVal !== 'object' || targetVal.type !== 'object') {
    return [{
      message: 'Schemat måste vara av typen "object".'
    }];
  }

  const props = targetVal.properties || {};
  const missing = mandatory.filter((key) => !props.hasOwnProperty(key));

  return missing.map((key) => ({
    message: `Schema saknar obligatoriskt fält enligt RFC 9457: ${key}`
  }));
};
