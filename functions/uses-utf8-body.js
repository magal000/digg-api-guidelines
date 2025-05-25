module.exports = (targetVal) => {
  const mediaTypes = Object.keys(targetVal ?? {});
  const usesUtf8 = mediaTypes.some((mt) =>
    mt.toLowerCase().includes('utf-8')
  );

  if (!usesUtf8) {
    return [
      {
        message: "Ett request BÖR skickas i UTF-8.",
      },
    ];
  }

  return [];
};
