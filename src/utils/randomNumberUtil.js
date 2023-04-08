function getRandomNumber(min, max, decimalPlaces) {
  const randomNumber = Math.random() * (max - min) + min;
  return Math.floor(randomNumber.toFixed(decimalPlaces));
}

module.exports = getRandomNumber;
