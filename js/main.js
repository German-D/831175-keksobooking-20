'use strict';

// var map = document.querySelector('.map');
// map.classList.remove('map--faded');

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
  var locationY = getRandomNumber(130, 630);
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
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var address = document.querySelector('#address');
for (var u = 0; u < adFormFields.length; u++) {
  adFormFields[u].setAttribute('disabled', 'disabled');
}

var mapPinMain = document.querySelector('.map__pin--main');

var activeForm = function (form, collection, evt) {
  form.classList.remove('ad-form--disabled');
  for (var t = 0; t < collection.length; t++) {
    collection[t].removeAttribute('disabled');
  }
  address.value = evt.clientX;
};

var mapPinMainMousedownHandler = function (evt) {
  if (evt.button === 0) {
    activeForm(adForm, adFormFields, evt);
  }
};
var mapPinMainKeydownhandler = function (evt) {
  if (evt.key === 'Enter') {
    activeForm(adForm, adFormFields, evt);
  }
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

var removeAttributes = function (attribute1, attribute2) {
  for (var l = 0; l < capacityOptions.length; l++) {
    capacityOptions[l].removeAttribute(attribute1);
    capacityOptions[l].removeAttribute(attribute2);
  }
};

var setAttribute = function (attribute, element) {
  element.setAttribute(attribute, attribute);
};

var roomNumberChangeHandler = function () {
  removeAttributes('selected', 'disabled');

  if (roomNumber.value === '1') {
    setAttribute('selected', capacityObj.oneGuest);
    setAttribute('disabled', capacityObj.twoGuests);
    setAttribute('disabled', capacityObj.threeGuests);
    setAttribute('disabled', capacityObj.noGuests);
  }

  if (roomNumber.value === '2') {
    setAttribute('selected', capacityObj.twoGuests);
    setAttribute('disabled', capacityObj.threeGuests);
    setAttribute('disabled', capacityObj.noGuests);
  }

  if (roomNumber.value === '3') {
    setAttribute('selected', capacityObj.threeGuests);
    setAttribute('disabled', capacityObj.noGuests);
  }

  if (roomNumber.value === '100') {
    setAttribute('selected', capacityObj.noGuests);
    setAttribute('disabled', capacityObj.threeGuests);
    setAttribute('disabled', capacityObj.twoGuests);
    setAttribute('disabled', capacityObj.oneGuest);
  }
};

roomNumber.addEventListener('change', roomNumberChangeHandler);
