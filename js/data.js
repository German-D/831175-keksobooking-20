'use strict';

(function () {

  var MAX_MAIN_PIN_TOUCH_Y = 630;
  var MIN_MAIN_PIN_TOUCH_Y = 130;

  var mapPins = document.querySelector('.map__pins');
  var pinWidth = mapPins.querySelector('img').clientWidth;
  var mapOverlay = document.querySelector('.map__overlay');
  var mapOverlayWidth = mapOverlay.clientWidth;
  var pinCoordinate = mapOverlayWidth - pinWidth;

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

  var hotelPhotos = [];

  for (var y = 1; y < 4; y++) {
    hotelPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + y + '.jpg');
  }

  var allHotels = [];
  for (var i = 0; i < 8; i++) {
    var locationX = window.main.getRandomNumber(pinWidth, pinCoordinate);
    var locationY = window.main.getRandomNumber(MIN_MAIN_PIN_TOUCH_Y, MAX_MAIN_PIN_TOUCH_Y);
    var iNext = i + 1;

    allHotels.push({
      author: {
        avatar: 'img/avatars/user' + '0' + iNext + '.png'
      },
      offer: {
        title: 'Это тайтл',
        address: locationX + ',' + locationY,
        price: 1000,
        type: types[window.main.getRandomNumber(0, 3)],
        rooms: 3,
        guests: 3,
        checkin: '12:00',
        checkout: '12:00',
        features: window.main.getNewArrayRandomLength(featuresInHotel),
        description: 'строка с описанием',
        photos: window.main.getNewArrayRandomLength(hotelPhotos),
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  window.data = {
    allHotels: allHotels,
  };

})();
