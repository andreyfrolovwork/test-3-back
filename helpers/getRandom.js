const getRandom = () => {
  let random = Math.random();
  while (random === 0) {
    // выводит 0, затем 1, затем 2
    random = Math.random();
  }
  /*const startPoint = random.indexOf(".");*/
  random = String(random);
  random = random.slice(3);

  return random;
};
module.exports = getRandom;
