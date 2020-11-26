const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementsContainer = document.querySelector('.elements');

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeEditCloseButton = document.querySelector('.popup__close_type_edit');
const popupFormTypeEdit = document.querySelector('.popup__form_type_edit');
const nameFieldPopup = document.querySelector('.popup__input_type_name');
const descriptionFieldPopup = document.querySelector('.popup__input_type_description');

const addButton = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeAddCloseButton = document.querySelector('.popup__close_type_add');
const popupFormTypeAdd = document.querySelector('.popup__form_type_add');
const titleFieldPopup = document.querySelector('.popup__input_type_title');
const urlFieldPopup = document.querySelector('.popup__input_type_url');
const popupInputUrl = popupFormTypeAdd.querySelector('.popup__input_type_url');
const popupInputTitle = popupFormTypeAdd.querySelector('.popup__input_type_title');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageTypeImage = document.querySelector('.popup__image');
const popupTitleTypeImage = document.querySelector('.popup__image-title');
const popupTypeImageCloseButton = document.querySelector('.popup__close_type_image');

function showPopup(popupType) {
  popupType.classList.add('popup_opened');
  function closePopupByOverlay(event) {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popupType);
      removeListenerAfterClosePopup();
    }
  }
  function closePopupByEsc(event) {
    if (event.key === 'Escape') {
      closePopup(popupType);
      removeListenerAfterClosePopup();
    }
  }
  function removeListenerAfterClosePopup() { //т.к. при каждом открытии попапа назначается слушатель, то его нужно удалять каждый раз при закрытии попапа
    popupType.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown', closePopupByEsc);
  }
  popupType.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
}

function submitFormTypeEdit(event) {
  event.preventDefault(); /* этот код предотвращает выполнение действий браузера "по-умолчанию" помимо тех, что указали мы */
  profileName.textContent = nameFieldPopup.value;
  profileDescription.textContent = descriptionFieldPopup.value;
  closePopup(popupTypeEdit);
}

function submitFormTypeAdd(event) {
  event.preventDefault(); /* этот код предотвращает выполнение действий браузера "по-умолчанию" помимо тех, что указали мы */
  closePopup(popupTypeAdd);
  const cardUrl = popupInputUrl.value;
  const cardName = popupInputTitle.value;
  addCard(elementsContainer, cardName, cardUrl);
  popupFormTypeAdd.reset();
}

function createElement(cardName, cardUrl) {
  const cardElement = document.querySelector('#card-template').content.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  const elementLike = cardElement.querySelector('.element__like');
  const elementRemoveButton = cardElement.querySelector('.element__remove-button');

  elementImage.src = cardUrl; // назначили url для картинки
  elementTitle.textContent = cardName; // назначили название карточки

  elementImage.addEventListener('click', () => {
    showPopup(popupTypeImage); // добавили класс видимости попапа, тем самым отобразив его на экране
    popupImageTypeImage.src = elementImage.src; // приравняли url картинки в карточке url картинке в попапе
    popupTitleTypeImage.textContent = elementTitle.textContent; // приравняли текст в карточке тексту в попапе
  });
  elementLike.addEventListener('click', (event) => { // слушатель, устанавливающий или убирающий лайк
    event.target.classList.toggle('element__like_active');
  });
  elementRemoveButton.addEventListener('click', event => { // слушатель на удаление карточки
    const card = event.target.closest('.element');
    card.remove();
  })
  return cardElement;
}

function addCard(listElement, name, link) {
  listElement.prepend(createElement(name, link));
}

initialCards.forEach(function (item) { // Рендерим первоначальный массив карточек
  addCard(elementsContainer, item.name, item.link);
});

editButton.addEventListener('click', function () {
  showPopup(popupTypeEdit);
  nameFieldPopup.value = profileName.textContent;
  descriptionFieldPopup.value = profileDescription.textContent;
});
popupTypeEditCloseButton.addEventListener('click', function () {
  closePopup(popupTypeEdit)
});
popupFormTypeEdit.addEventListener('submit', submitFormTypeEdit);

addButton.addEventListener('click', function () {
  showPopup(popupTypeAdd);
});
popupTypeAddCloseButton.addEventListener('click', function () {
  closePopup(popupTypeAdd);
});
popupFormTypeAdd.addEventListener('submit', submitFormTypeAdd);

popupTypeImageCloseButton.addEventListener('click', function () {
  closePopup(popupTypeImage);
});

