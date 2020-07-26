'use strict';
(function () {

  window.main = {
    getRandomNumber: function (min, max) {
      var randomNumber = min + Math.random() * (max + 1 - min);
      return Math.floor(randomNumber);
    },
    getNewArrayRandomLength: function (array) {
      var newArrayLength = window.main.getRandomNumber(0, array.length);
      var newArray = array.slice(0, newArrayLength);

      return newArray;
    },
  };
})();
