module.exports = (targetVal) => {
  const openapiVersion = targetVal.openapi;

  if (!openapiVersion || typeof openapiVersion !== 'string') {
    return [
      {
        message: 'OpenAPI-fältet saknas eller är ogiltigt.',
      },
    ];
  }

  // Check for version pattern: major version >= 3
  const versionMatch = openapiVersion.match(/^(\d+)\.\d+\.\d+$/);
  if (!versionMatch || parseInt(versionMatch[1], 10) < 3) {
    return [
      {
        message: `OpenAPI-versionen "${openapiVersion}" är för gammal. Använd minst 3.x.y.`,
      },
    ];
  }

  return [];
};
