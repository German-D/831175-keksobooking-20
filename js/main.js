'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
  'bungalo'
];

var featuresInHotel = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var mapOverlay = document.querySelector('.map__overlay');
var mapOverlayWidth = mapOverlay.clientWidth;

var hotelPhotos = [];

for (var y = 1; y < 4; y++) {
  hotelPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + y + '.jpg');
}

var allHotels = [];
for (var i = 0; i < 8; i++) {
  var locationX = getRandomNumber(1, mapOverlayWidth);
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
      photos: getNewArrayRandomLength(hotelPhotos)
    },
    location: {
      x: locationX,
      y: locationY
    }
  });
}

var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderHotel = function (hotels, template) {
  var hotelElement = template.cloneNode(true);
  var hotelElementImg = hotelElement.querySelector('img');

  hotelElement.style = 'left: ' + hotels.location.x + 'px; top: ' + hotels.location.y + 'px;';
  hotelElementImg.style.src = hotels.author.avatar;
  hotelElementImg.style.alt = hotels.offer.title;

  return hotelElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < allHotels.length; k++) {
  var newHotel = renderHotel(allHotels[k], pinTemplate);
  fragment.appendChild(newHotel);
}

mapPins.appendChild(fragment);

var getMatchedValue = function (type) {

  var matchedTypes = {
    'flat': function () {
      return 'Квартира';
    },
    'bungalo': function () {
      return 'Бунгало';
    },
    'house': function () {
      return 'Дом';
    },
    'palace': function () {
      return 'Дворец';
    }
  };
  return matchedTypes[type]();
};

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

var renderMapHotel = function (hotel, template) {
  var hotelMapElement = template.cloneNode(true);

  var popupTitle = hotelMapElement.querySelector('.popup__title');
  var popupTextAddress = hotelMapElement.querySelector('.popup__text--address');
  var popupTextPrice = hotelMapElement.querySelector('.popup__text--price');
  var popupType = hotelMapElement.querySelector('.popup__type');
  var popupTextCapacity = hotelMapElement.querySelector('.popup__text--capacity');
  var popupTextTime = hotelMapElement.querySelector('.popup__text--time');
  var popupFeatures = hotelMapElement.querySelector('.popup__features');
  var popupDescription = hotelMapElement.querySelector('.popup__description');
  var popupAvatar = hotelMapElement.querySelector('.popup__avatar');

  popupTitle.innerHTML = hotel.offer.title;
  popupTextAddress.innerHTML = hotel.offer.address;
  popupTextPrice.innerHTML = hotel.offer.price + '₽/ночь';
  popupType.innerHTML = getMatchedValue(hotel.offer.type);
  popupTextCapacity.innerHTML = allHotels[0].offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
  popupTextTime.innerHTML = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;

  if (hotel.offer.features.length > 1) {
    popupFeatures.innerHTML = hotel.offer.features;
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


var mapBlock = document.querySelector('.map');
var fragmentMap = document.createDocumentFragment();
var newMapHotel = renderMapHotel(allHotels[0], cardTemplate);
fragmentMap.appendChild(newMapHotel);

mapBlock.appendChild(fragmentMap);
