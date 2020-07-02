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

var renderHotel = function (hotels, template) {
  var hotelElement = template.cloneNode(true);
  var hotelElementImg = hotelElement.querySelector('img');

  hotelElement.style = 'left: ' + hotels.location.x + 'px; top: ' + hotels.location.y + 'px;';
  hotelElementImg.src = hotels.author.avatar;
  hotelElementImg.alt = hotels.offer.title;

  return hotelElement;
};

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();
for (var k = 0; k < allHotels.length; k++) {
  var newHotel = renderHotel(allHotels[k], pinTemplate);
  fragment.appendChild(newHotel);
}

mapPins.appendChild(fragment);

// var getMatchedValue = function (type) {
//
//   var matchedTypes = {
//     flat: 'Квартира',
//     bungalo: 'Бунгало',
//     house: 'Дом',
//     palace: 'Дворец',
//   };

//   return matchedTypes[type];
// };

// var cardTemplate = document.querySelector('#card')
//   .content
//   .querySelector('.popup');
//
// var renderMapHotel = function (hotel, template) {
//   var hotelMapElement = template.cloneNode(true);
//
//   var popupTitle = hotelMapElement.querySelector('.popup__title');
//   var popupTextAddress = hotelMapElement.querySelector('.popup__text--address');
//   var popupTextPrice = hotelMapElement.querySelector('.popup__text--price');
//   var popupType = hotelMapElement.querySelector('.popup__type');
//   var popupTextCapacity = hotelMapElement.querySelector('.popup__text--capacity');
//   var popupTextTime = hotelMapElement.querySelector('.popup__text--time');
//   var popupFeatures = hotelMapElement.querySelector('.popup__features');
//   var popupDescription = hotelMapElement.querySelector('.popup__description');
//   var popupAvatar = hotelMapElement.querySelector('.popup__avatar');
//
//   if (hotel.offer.title) {
//     popupTitle.innerHTML = hotel.offer.title;
//   } else {
//     popupTitle.textContent = '';
//   }
//
//   if (hotel.offer.address) {
//     popupTextAddress.innerHTML = hotel.offer.address;
//   } else {
//     popupTextAddress.textContent = '';
//   }
//
//   if (hotel.offer.price) {
//     popupTextPrice.innerHTML = hotel.offer.price + '₽/ночь';
//   } else {
//     popupTextPrice.textContent = '';
//   }
//
//   if (hotel.offer.type.length > 1) {
//     popupType.innerHTML = getMatchedValue(hotel.offer.type);
//   } else {
//     popupType.textContent = '';
//   }
//
//   if (allHotels[0].offer.rooms && hotel.offer.guests) {
//     popupTextCapacity.innerHTML = allHotels[0].offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
//   } else {
//     popupTextCapacity.textContent = '';
//   }
//
//   if (hotel.offer.checkin && hotel.offer.checkout) {
//     popupTextTime.innerHTML = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
//   } else {
//     popupTextTime.textContent = '';
//   }
//
//   if (hotel.offer.features.length > 1) {
//     popupFeatures.innerHTML = hotel.offer.features;
//   } else {
//     popupFeatures.textContent = '';
//   }
//
//   popupDescription.innerHTML = hotel.offer.description;
//   popupAvatar.src = hotel.author.avatar;
//
//   var photosLength = hotel.offer.photos.length;
//   var popupPhotos = hotelMapElement.querySelector('.popup__photos');
//   var popupPhoto = popupPhotos.querySelector('.popup__photo');
//
//
//   if (photosLength > 0) {
//     hotel.offer.photos.forEach(function (item, index) {
//       if (index === 0) {
//         popupPhoto.src = item;
//         return;
//       }
//       var popupPhotoTemplate = popupPhoto.cloneNode(true);
//       popupPhotoTemplate.src = item;
//       popupPhotos.appendChild(popupPhotoTemplate);
//     });
//   } else {
//     popupPhotos.textContent = '';
//   }
//
//   return hotelMapElement;
// };
//
//
// var mapBlock = document.querySelector('.map');
// var fragmentMap = document.createDocumentFragment();
// var newMapHotel = renderMapHotel(allHotels[0], cardTemplate);
// fragmentMap.appendChild(newMapHotel);
//
// mapBlock.appendChild(fragmentMap);

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

var deactivateform = function (formFields) {

  for (var u = 0; u < formFields.length; u++) {
    formFields[u].setAttribute('disabled', 'disabled');
  }
};

address.value = startMainPinX + ', ' + startMainPinY;

var documentLoadedHandler = function () {
  deactivateform(adFormFields);
};

var activeForm = function (form, collection) {
  form.classList.remove('ad-form--disabled');
  for (var t = 0; t < collection.length; t++) {
    collection[t].removeAttribute('disabled');
  }
  address.value = startMainPinX + ', ' + mainPinTouchY;
};

var mapPinMainMousedownHandler = function (evt) {
  if (evt.button === 0) {
    activeForm(adForm, adFormFields, evt);
  }
  map.classList.remove('map--faded');
  mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
};

var mapPinMainKeydownhandler = function (evt) {
  if (evt.key === 'Enter') {
    activeForm(adForm, adFormFields, evt);
  }
  map.classList.remove('map--faded');
  mapPinMain.removeEventListener('keydown', mapPinMainKeydownhandler);
};


mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
mapPinMain.addEventListener('keydown', mapPinMainKeydownhandler);

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('option');

var capacityObj = {
  oneGuest: capacityOptions[2],
  twoGuests: capacityOptions[1],
  threeGuests: capacityOptions[0],
  noGuests: capacityOptions[3],
};

capacityObj.twoGuests.setAttribute('disabled', 'disabled');
capacityObj.threeGuests.setAttribute('disabled', 'disabled');
capacityObj.noGuests.setAttribute('disabled', 'disabled');

var roomNumberChangeHandler = function () {

  var removeAttributes = function (attrib) {
    for (var l = 0; l < capacityOptions.length; l++) {
      capacityOptions[l].removeAttribute(attrib);
    }
  };

  if (roomNumber.value === '1') {
    if (capacity.value === '1') {
      capacity.value = '1';
    }
    if (capacity.value === '2') {
      // alert('Недоступен выбор количества мест для ' + capacity.value + ' гостей в ' + roomNumber.value + ' комнате');
      capacity.value = '1';
    }
    if (capacity.value === '3') {
      // alert('Недоступен выбор количества мест для ' + capacity.value + ' гостей в ' + roomNumber.value + ' комнате');
      capacity.value = '1';
    }
    if (capacity.value === '0') {
      // alert('Недоступен выбор Не для гостей в ' + roomNumber.value + ' комнате');
      capacity.value = '1';
    }
    removeAttributes('selected');
    removeAttributes('disabled');

    capacityObj.oneGuest.setAttribute('selected', 'selected');
    capacityObj.twoGuests.setAttribute('disabled', 'disabled');
    capacityObj.threeGuests.setAttribute('disabled', 'disabled');
    capacityObj.noGuests.setAttribute('disabled', 'disabled');
  }

  if (roomNumber.value === '2') {
    if (capacity.value === '1') {
      capacity.value = '1';
    }
    if (capacity.value === '2') {
      capacity.value = '2';
    }
    if (capacity.value === '3') {
      // alert('Недоступен выбор количества мест для ' + capacity.value + ' гостей в ' + roomNumber.value + ' комнатах');
      capacity.value = '1';
    }
    if (capacity.value === '0') {
      // alert('Недоступен выбор Не для гостей в ' + roomNumber.value + ' комнатах');
      capacity.value = '1';
    }

    removeAttributes('selected');
    removeAttributes('disabled');

    capacityObj.oneGuest.setAttribute('selected', 'selected');
    capacityObj.threeGuests.setAttribute('disabled', 'disabled');
    capacityObj.noGuests.setAttribute('disabled', 'disabled');
  }

  if (roomNumber.value === '3') {
    if (capacity.value === '1') {
      capacity.value = '1';
    }
    if (capacity.value === '2') {
      capacity.value = '2';
    }
    if (capacity.value === '3') {
      capacity.value = '3';
    }
    if (capacity.value === '0') {
      // alert('Недоступен выбор Не для гостей в ' + roomNumber.value + ' комнатах');
      capacity.value = '1';
    }
    removeAttributes('selected');
    removeAttributes('disabled');

    capacityObj.oneGuest.setAttribute('selected', 'selected');
    capacityObj.noGuests.setAttribute('disabled', 'disabled');
  }

  if (roomNumber.value === '100') {
    // alert('В 100 комнатах доступно размещение только для Не гостей');
    capacity.value = '0';
    removeAttributes('selected');
    removeAttributes('disabled');

    capacityObj.noGuests.setAttribute('selected', 'selected');
    capacityObj.oneGuest.setAttribute('disabled', 'disabled');
    capacityObj.twoGuests.setAttribute('disabled', 'disabled');
    capacityObj.threeGuests.setAttribute('disabled', 'disabled');

  }
};
document.addEventListener('DOMContentLoaded', documentLoadedHandler);
roomNumber.addEventListener('change', roomNumberChangeHandler);
