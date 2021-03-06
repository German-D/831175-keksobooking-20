'use strict';

var MAIN_PIN_OFFSET_Y = 80;
var MAX_MAIN_PIN_TOUCH_Y = 630;
var MIN_MAIN_PIN_TOUCH_Y = 130;

var map = document.querySelector('.map');

var getRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var getNewArrayRandomLength = function (array) {
  var newArrayLength = getRandomNumber(0, array.length);
  var newArray = array.slice(0, newArrayLength);

  return newArray;
};

var types = [
  'palace',
  'flat',
  'house',
  'bungalo',
];

var featuresInHotel = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var featuresInHotelMatch = {
  wifi: 'popup__feature--wifi',
  dishwasher: 'popup__feature--dishwasher',
  parking: 'popup__feature--parking',
  washer: 'popup__feature--washer',
  elevator: 'popup__feature--elevator',
  conditioner: 'popup__feature--conditioner',
};

var mapPins = document.querySelector('.map__pins');

var pinWidth = mapPins.querySelector('img').clientWidth;

var mapOverlay = document.querySelector('.map__overlay');
var mapOverlayWidth = mapOverlay.clientWidth;
var pinCoordinate = mapOverlayWidth - pinWidth;

var hotelPhotos = [];

for (var y = 1; y < 4; y++) {
  hotelPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + y + '.jpg');
}

var allHotels = [];
for (var i = 0; i < 8; i++) {
  var locationX = getRandomNumber(pinWidth, pinCoordinate);
  var locationY = getRandomNumber(MIN_MAIN_PIN_TOUCH_Y, MAX_MAIN_PIN_TOUCH_Y);
  var iNext = i + 1;

  allHotels.push({
    author: {
      avatar: 'img/avatars/user' + '0' + iNext + '.png'
    },
    offer: {
      title: 'Это тайтл',
      address: locationX + ',' + locationY,
      price: 1000,
      type: types[getRandomNumber(0, 3)],
      rooms: 3,
      guests: 3,
      checkin: '12:00',
      checkout: '12:00',
      features: getNewArrayRandomLength(featuresInHotel),
      description: 'строка с описанием',
      photos: getNewArrayRandomLength(hotelPhotos),
    },
    location: {
      x: locationX,
      y: locationY
    }
  });
}

var renderHotel = function (hotel, template, order) {
  var hotelElement = template.cloneNode(true);
  var hotelElementImg = hotelElement.querySelector('img');

  hotelElement.style = 'left: ' + hotel.location.x + 'px; top: ' + hotel.location.y + 'px;';
  hotelElementImg.src = hotel.author.avatar;
  hotelElementImg.alt = hotel.offer.title;
  hotelElement.setAttribute('data-order', order);
  return hotelElement;
};

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();
for (var k = 0; k < allHotels.length; k++) {
  var newHotel = renderHotel(allHotels[k], pinTemplate, k);
  fragment.appendChild(newHotel);
}

var getMatchedValue = function (type) {

  var matchedTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  return matchedTypes[type];
};

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

var getMapHotel = function (hotel, template) {
  var hotelMapElement = template.cloneNode(true);

  var popupTitle = hotelMapElement.querySelector('.popup__title');
  var popupTextAddress = hotelMapElement.querySelector('.popup__text--address');
  var popupTextPrice = hotelMapElement.querySelector('.popup__text--price');
  var popupType = hotelMapElement.querySelector('.popup__type');
  var popupTextCapacity = hotelMapElement.querySelector('.popup__text--capacity');
  var popupTextTime = hotelMapElement.querySelector('.popup__text--time');
  var popupFeatures = hotelMapElement.querySelector('.popup__features');
  var popupFeaturesCollection = hotelMapElement.querySelectorAll('.popup__feature');
  var popupDescription = hotelMapElement.querySelector('.popup__description');
  var popupAvatar = hotelMapElement.querySelector('.popup__avatar');

  if (hotel.offer.title) {
    popupTitle.innerHTML = hotel.offer.title;
  } else {
    popupTitle.textContent = '';
  }

  if (hotel.offer.address) {
    popupTextAddress.innerHTML = hotel.offer.address;
  } else {
    popupTextAddress.textContent = '';
  }

  if (hotel.offer.price) {
    popupTextPrice.innerHTML = hotel.offer.price + '₽/ночь';
  } else {
    popupTextPrice.textContent = '';
  }

  if (hotel.offer.type.length > 1) {
    popupType.innerHTML = getMatchedValue(hotel.offer.type);
  } else {
    popupType.textContent = '';
  }

  if (allHotels[0].offer.rooms && hotel.offer.guests) {
    popupTextCapacity.innerHTML = allHotels[0].offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
  } else {
    popupTextCapacity.textContent = '';
  }

  if (hotel.offer.checkin && hotel.offer.checkout) {
    popupTextTime.innerHTML = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
  } else {
    popupTextTime.textContent = '';
  }

  if (hotel.offer.features.length > 1) {
    var hotelFeatures = hotel.offer.features;
    var featuresClasses = hotelFeatures.map(function (type) {
      return featuresInHotelMatch[type];
    });

    for (var d = 0; d < popupFeaturesCollection.length; d++) {
      var flag = false;

      for (var f = 0; f < featuresClasses.length; f++) {
        if (popupFeaturesCollection[d].classList.contains(featuresClasses[f])) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        popupFeaturesCollection[d].remove();
      }
    }

  } else {
    popupFeatures.textContent = '';
  }

  popupDescription.innerHTML = hotel.offer.description;
  popupAvatar.src = hotel.author.avatar;

  var photosLength = hotel.offer.photos.length;
  var popupPhotos = hotelMapElement.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');


  if (photosLength > 0) {
    hotel.offer.photos.forEach(function (item, index) {
      if (index === 0) {
        popupPhoto.src = item;
        return;
      }
      var popupPhotoTemplate = popupPhoto.cloneNode(true);
      popupPhotoTemplate.src = item;
      popupPhotos.appendChild(popupPhotoTemplate);
    });
  } else {
    popupPhotos.textContent = '';
  }

  return hotelMapElement;
};

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Проставлю всей форме disabled
var mapPinMain = document.querySelector('.map__pin--main');
var mapPinMainWidth = mapPinMain.getBoundingClientRect().width;
var mapPinMainHeight = mapPinMain.getBoundingClientRect().height;

var adForm = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var startMainPinX = Math.round(mapPinMain.getBoundingClientRect().x + mapPinMainWidth / 2);
var startMainPinY = Math.round(mapPinMain.getBoundingClientRect().y + pageYOffset + mapPinMainHeight / 2);
var mainPinTouchY = Math.round(mapPinMain.getBoundingClientRect().y + pageYOffset + MAIN_PIN_OFFSET_Y);
var adFormFields = adForm.querySelectorAll('fieldset');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var mapBlock = document.querySelector('.map');

var deactivateElements = function (elements) {
  for (var u = 0; u < elements.length; u++) {
    elements[u].setAttribute('disabled', 'disabled');
  }
};

address.value = startMainPinX + ', ' + startMainPinY;

var activatePage = function () {

  address.value = startMainPinX + ', ' + mainPinTouchY;
  map.classList.remove('map--faded');
  mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
  mapPinMain.removeEventListener('keydown', mapPinMainKeydownhandler);
  // defaultDisabledCapacity();
  actualConnectedSelects(roomNumber, capacity);
  actualConnectedTypes(type, price);
  adForm.classList.remove('ad-form--disabled');
  activateElements(adFormFields);


  // На все значки отелей вешаю обработчик на клик и на нажание клавиши ентер
  mapPins.appendChild(fragment);
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
// Обработчик на всём документе нажания Esc
var documentKeydownHandler = function (evt) {
  if (evt.key === 'Escape') {
    removePopupNode();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Функция удаления Ноды подробней отеля
var removePopupNode = function () {
  var noda = document.querySelector('.popup');
  if (noda) {
    noda.remove();
  }
};
/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Отрисовка окна подробностей отеля
var openPopup = function (evt) {

  removePopupNode();
  var myHotel;

  // Получаю мой отель
  var buttonEl = evt.target.closest('.map__pin');
  var buttonOrder = buttonEl.dataset.order;
  myHotel = allHotels[buttonOrder];

  // Отрисую подробности выбранного отеля
  var newMapHotel = getMapHotel(myHotel, cardTemplate);
  mapBlock.appendChild(newMapHotel);

  // Сразу-же после отрисовки ногового окна добавляю обработчик клика на крестик
  var popupClose = document.querySelector('.popup__close');
  var popupCloseClickHandler = function () {
    removePopupNode();
  };
  popupClose.addEventListener('click', popupCloseClickHandler);

  // Сразу-же после отрисовки ногового окна добавлю на весь документ обработчк на Esc кот закроет подр. отеля
  document.addEventListener('keydown', documentKeydownHandler);
};

/* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Создаю два обработчика на клик и клавишу ентер по иконке отеля
var mapPinClickHandler = function (evt) {
  openPopup(evt);
};

var mapPinKeydownHandler = function (evt) {
  if (evt.key === 'Enter') {
    openPopup(evt);
  }
};

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
