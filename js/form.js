'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainWidth = mapPinMain.getBoundingClientRect().width;
  var mapPinMainHeight = mapPinMain.getBoundingClientRect().height;

  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var startMainPinX = Math.round(mapPinMain.getBoundingClientRect().x + mapPinMainWidth / 2);
  var startMainPinY = Math.round(mapPinMain.getBoundingClientRect().y + pageYOffset + mapPinMainHeight / 2);
  var adFormFields = adForm.querySelectorAll('fieldset');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var deactivateElements = function (elements) {
    for (var u = 0; u < elements.length; u++) {
      elements[u].setAttribute('disabled', 'disabled');
    }
  };

  address.value = startMainPinX + ', ' + startMainPinY;

  var actualConnectedSelects = function (selectEl1, selectEl2) {

    // Значение первого селекта
    var select1Value = selectEl1.value;

    // Значение всех option у второго селекта
    var select2Options = selectEl2.querySelectorAll('option');

    // Все варианты
    var options = [
      {
        select1Value: '1',
        allowableValues: ['1'],
        // allowableSelects: ['1'],
      },
      {
        select1Value: '2',
        allowableValues: ['1', '2'],
        // allowableSelects: ['2'],
      },
      {
        select1Value: '3',
        allowableValues: ['1', '2', '3'],
        // allowableSelects: ['3'],
      },
      {
        select1Value: '100',
        allowableValues: ['0'],
        // allowableSelects: ['0'],
      },
    ];

    // Актуальный объект из options
    var currentOption = options.find(function (option) {
      return select1Value === option.select1Value;
    });

    if (!currentOption) {
      return;
    }

    Array.from(select2Options)// Значение всех option у второго селекта перевели в массив
      .forEach(function (option) {
        var allowableValues = currentOption.allowableValues;// Массив допустимых Capacity, например [1, 2],
        // var allowableSelects = currentOption.allowableSelects; // Массив допустимых Selects, например [1, 2],

        if (allowableValues.includes(option.value)) { // Если в массиве возможных Capacity есть значение этого Capacity
          option.removeAttribute('disabled'); // То удали атрибут disabled
        } else {
          option.setAttribute('disabled', 'disabled');// Иначе добавь атрибут disabled
        }
        // Если нужно менять значение во втором селекте
        // if (allowableSelects.includes(option.value)) {   // Если в массиве возможных Capacity есть значение этого Capacity
        //   option.setAttribute('selected', 'selected');  // Иначе добавь атрибут selected
        // } else {
        //   option.removeAttribute('selected'); // То удали атрибут selected
        // }
      });
  };
  var roomNumberChangeHandler = function () {
    actualConnectedSelects(roomNumber, capacity);
  };
  document.addEventListener('DOMContentLoaded', function () {
    deactivateElements(adFormFields);
  });
  roomNumber.addEventListener('change', roomNumberChangeHandler);


  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Логика «Тип жилья» и «Цена за ночь»
  var actualConnectedTypes = function (select1, select2) {
    // Значение первого селекта
    var select1Value = select1.value;

    // Все варианты
    var matchedOptions = [
      {
        select1Value: 'bungalo',
        minPrice: '0',
      },
      {
        select1Value: 'flat',
        minPrice: '1000',
      },
      {
        select1Value: 'house',
        minPrice: '5000',
      },
      {
        select1Value: 'palace',
        minPrice: '10000',
      },
    ];

    // Актуальный объект из matchedOptions
    var currentMatchedOption = matchedOptions.find(function (matchedOption) {
      return select1Value === matchedOption.select1Value;
    });

    if (!currentMatchedOption) {
      return;
    }

    select2.setAttribute('min', currentMatchedOption.minPrice);
    select2.setAttribute('placeholder', currentMatchedOption.minPrice);
  };

  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var typeChangeHandler = function () {
    actualConnectedTypes(type, price);
  };
  type.addEventListener('change', typeChangeHandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Логика «Время заезда» и «Время выезда»
  var actualConnectedTimes = function (select1, select2, evt) {

    // Если клик на «Время заезда», то меняю выбранное значение в «Время выезда»
    var select1Values = select1.querySelectorAll('option');
    var select2Values = select2.querySelectorAll('option');

    if (evt.target.id === 'timein') {
      select2.value = select1.value;

      Array.from(select1Values)
        .forEach(function (option) {
          if (option.value === select1.value) {
            option.setAttribute('selected', '');
          } else {
            option.removeAttribute('selected');
          }
        });
    } else {
      // Если клик на «Время выезда», то меняю выбранное значение во на «Время заезда»
      select1.value = select2.value;

      Array.from(select2Values)
        .forEach(function (option) {
          if (option.value === select2.value) {
            option.setAttribute('selected', '');
          } else {
            option.removeAttribute('selected');
          }
        });
    }
  };

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeInChangeHandler = function (evt) {
    actualConnectedTimes(timeIn, timeOut, evt);
  };
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeInChangeHandler);

  window.form = {
    actualConnectedSelects: actualConnectedSelects,
    actualConnectedTypes: actualConnectedTypes,
  };
})();
