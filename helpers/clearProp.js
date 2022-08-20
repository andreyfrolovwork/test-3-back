const clearProp = (obj, prop) => {
  let newObj = { ...obj };
  for (const properties in obj) {
    if (obj[properties] === prop) {
      delete newObj[properties];
    }
  }
  return newObj;
};

module.exports = clearProp;
