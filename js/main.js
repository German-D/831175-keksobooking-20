'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var getArrayLength = function (min, aray) {
  return getRandomNumber(min, aray.length - 1);
};

var getNewArrayRandomLength = function (array) {
  var newArray = [];
  var newArrayLength = getArrayLength(1, array);

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

  allHotels.push(
      {
        author: {
          avatar: 'img/avatars/user' + '0' + i++ + '.png'
        },
        offer: {
          title: 'Это тайтл',
          address: 'locationX' + ', ' + 'locationY',
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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

