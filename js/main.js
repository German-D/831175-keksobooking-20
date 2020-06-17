'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var getRandomArrayLength = function (min, array) {
  return getRandomNumber(min, array.length);
};

var getNewArrayRandomLength = function (array) {
  var newArray = [];
  var newArrayLength = getRandomArrayLength(1, array);

  for (var n = 0; n < newArrayLength; n++) {
    newArray.push(array[n]);
  }
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

var hotelPhotos = [];

for (var y = 1; y < 4; y++) {
  hotelPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + y + '.jpg');
}

var allHotels = [];
for (var i = 0; i < 8; i++) {
  var locationX = getRandomNumber(1, 500);
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
      type: types[i],
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
  if (type === 'flat') {
    return 'Квартира';
  }
  if (type === 'bungalo') {
    return 'Бунгало';
  }
  if (type === 'house') {
    return 'Дом';
  } else {
    return 'Дворец';
  }
};

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

var renderMapHotel = function (hotel, template) {
  var hotelMapElement = template.cloneNode(true);

  hotelMapElement.querySelector('.popup__title').innerHTML = hotel.offer.title;
  hotelMapElement.querySelector('.popup__text--address').innerHTML = hotel.offer.address;
  hotelMapElement.querySelector('.popup__text--price').innerHTML = hotel.offer.price + '₽/ночь';
  hotelMapElement.querySelector('.popup__type').innerHTML = getMatchedValue(hotel.offer.type);
  hotelMapElement.querySelector('.popup__text--capacity')
    .innerHTML = allHotels[0].offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
  hotelMapElement.querySelector('.popup__text--time')
    .innerHTML = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
  hotelMapElement.querySelector('.popup__features').innerHTML = hotel.offer.features;
  hotelMapElement.querySelector('.popup__description').innerHTML = hotel.offer.description;
  hotelMapElement.querySelector('.popup__avatar').src = hotel.author.avatar;

  var photosLength = hotel.offer.photos.length;
  var popupPhotos = hotelMapElement.querySelector('.popup__photos');
  var popupPhoto = hotelMapElement.querySelector('.popup__photos')
    .querySelector('.popup__photo');
  popupPhoto.src = hotel.offer.photos[0];

  if (photosLength > 1) {
    for (var j = 1; j < photosLength; j++) {
      var popupPhotoTemplate = popupPhoto.cloneNode(true);
      popupPhotoTemplate.src = hotel.offer.photos[j];
      popupPhotos.appendChild(popupPhotoTemplate);
    }
  }

  return hotelMapElement;
};

var mapBlock = document.querySelector('.map');
var fragmentMap = document.createDocumentFragment();
var newMapHotel = renderMapHotel(allHotels[0], cardTemplate);
fragmentMap.appendChild(newMapHotel);

mapBlock.appendChild(fragmentMap);
