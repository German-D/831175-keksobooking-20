'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

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
  for (var k = 0; k < window.data.allHotels.length; k++) {
    var newHotel = renderHotel(window.data.allHotels[k], pinTemplate, k);
    fragment.appendChild(newHotel);
  }
  mapPins.appendChild(fragment);
})();
