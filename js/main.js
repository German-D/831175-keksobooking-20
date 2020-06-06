'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomPosition = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var getArray = function (array) {
  var newArray = [];
  for (var n = 0; n < getRandomPosition(1, array.length - 1); n++) {
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
  allHotels.push(
      {
        'author': {
          'avatar': 'img/avatars/user' + '0' + i++ + '.png'
        },
        'offer': {
          'title': 'Это тайтл',
          'address': '600, 350',
          'price': 1000,
          'type': types[i],
          'rooms': 3,
          'guests': 3,
          'checkin': '12:00',
          'checkout': '12:00',
          'features': getArray(featuresInHotel),
          'description': 'строка с описанием',
          'photos': getArray(hotelPhotos)
        },
        'location': {
          'x': getRandomPosition(1, 500),
          'y': getRandomPosition(130, 630)
        }
      });
}
var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderHotel = function (hotels) {
  var hotelElement = pinTemplate.cloneNode(true);

  hotelElement.style = 'left: ' + hotels.location.x + 'px; top: ' + hotels.location.y + 'px;';
  hotelElement.querySelector('img').style.src = hotels.author.avatar;
  hotelElement.querySelector('img').style.alt = hotels.offer.title;
  return hotelElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < allHotels.length; k++) {
  fragment.appendChild(renderHotel(allHotels[k]));
}

mapPins.appendChild(fragment);

