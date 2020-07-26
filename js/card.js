'use strict';

(function () {
  var mapBlock = document.querySelector('.map');

  var getMatchedValue = function (type) {

    var matchedTypes = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец',
    };

    return matchedTypes[type];
  };

  var featuresInHotelMatch = {
    wifi: 'popup__feature--wifi',
    dishwasher: 'popup__feature--dishwasher',
    parking: 'popup__feature--parking',
    washer: 'popup__feature--washer',
    elevator: 'popup__feature--elevator',
    conditioner: 'popup__feature--conditioner',
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

    if (window.data.allHotels[0].offer.rooms && hotel.offer.guests) {
      popupTextCapacity.innerHTML = window.data.allHotels[0].offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
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
    myHotel = window.data.allHotels[buttonOrder];

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

  window.card = {
    openPopup: openPopup,
  };

})();
