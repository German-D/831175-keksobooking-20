'use strict';

(function () {

  var MAIN_PIN_OFFSET_Y = 80;
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainWidth = mapPinMain.getBoundingClientRect().width;

  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var startMainPinX = Math.round(mapPinMain.getBoundingClientRect().x + mapPinMainWidth / 2);
  var mainPinTouchY = Math.round(mapPinMain.getBoundingClientRect().y + pageYOffset + MAIN_PIN_OFFSET_Y);
  var adFormFields = adForm.querySelectorAll('fieldset');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var map = document.querySelector('.map');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  var activatePage = function () {

    address.value = startMainPinX + ', ' + mainPinTouchY;
    map.classList.remove('map--faded');
    mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownhandler);
    window.form.actualConnectedSelects(roomNumber, capacity);
    window.form.actualConnectedTypes(type, price);
    adForm.classList.remove('ad-form--disabled');
    activateElements(adFormFields);

    /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
    // Создаю два обработчика на клик и клавишу ентер по иконке отеля
    var mapPinClickHandler = function (evt) {
      window.card.openPopup(evt);
    };

    var mapPinKeydownHandler = function (evt) {
      if (evt.key === 'Enter') {
        window.card.openPopup(evt);
      }
    };

    // На все значки отелей вешаю обработчик на клик и на нажание клавиши ентер
    var mapPin = document.querySelectorAll('.map__pin');

    for (var j = 1; j < mapPin.length; j++) {
      mapPin[j].addEventListener('click', mapPinClickHandler);
      mapPin[j].addEventListener('keydown', mapPinKeydownHandler);
    }
  };

  var activateElements = function (elements) {
    for (var t = 0; t < elements.length; t++) {
      elements[t].removeAttribute('disabled');
    }
  };

  var mapPinMainMousedownHandler = function (evt) {
    if (evt.button === 0) {
      activatePage(adForm, adFormFields);
    }
  };

  var mapPinMainKeydownhandler = function (evt) {
    if (evt.key === 'Enter') {
      activatePage(adForm, adFormFields);
    }
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownhandler);

})();
