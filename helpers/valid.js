const ApiError = require("../exceptions/ApiError.js");
const valid = (checkArray) => {
  let errorArray = [];
  checkArray.forEach((el) => {
    const checkResult = el[0](el[1], el[2]);
    if (!checkResult) {
      errorArray.push(el[3]);
    }
  });
  if (errorArray.length !== 0) {
    throw ApiError.BadRequest("Ошибка валидации", errorArray);
  }
};
module.exports = valid;
