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

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageTypeImage = document.querySelector('.popup__image');
const popupTitleTypeImage = document.querySelector('.popup__image-title')
const popupTypeImageCloseButton = document.querySelector('.popup__close_type_image');

const addForm = document.querySelector('.popup__form_type_add');



function showPopupTypeEdit() {
  popupTypeEdit.classList.add('popup_opened');
  nameFieldPopup.value = profileName.textContent;
  descriptionFieldPopup.value = profileDescription.textContent;
}
function closePopupTypeEdit() {
  popupTypeEdit.classList.remove('popup_opened');
}
function submitFormTypeEdit(event) {
  event.preventDefault(); /* этот код предотвращает выполнение действий браузера "по-умолчанию" помимо тех, что указали мы */
  profileName.textContent = nameFieldPopup.value;
  profileDescription.textContent = descriptionFieldPopup.value;
  closePopupTypeEdit()
}

function showPopupTypeAdd() {
  popupTypeAdd.classList.add('popup_opened');
  titleFieldPopup.value = "";
  urlFieldPopup.value = "";
}
function closePopupTypeAdd() {
  popupTypeAdd.classList.remove('popup_opened');
}
function submitFormTypeAdd(event) {
  event.preventDefault(); /* этот код предотвращает выполнение действий браузера "по-умолчанию" помимо тех, что указали мы */
  closePopupTypeAdd()
  const cardUrl = addForm.querySelector('.popup__input_type_url').value;
  const cardName = addForm.querySelector('.popup__input_type_title').value;
  addCard(cardName, cardUrl);
}

function showPopupTypeImage() {
  popupTypeImage.classList.add('popup_opened');
}
function closePopupTypeImage() {
  popupTypeImage.classList.remove('popup_opened');
}

function addCard(cardName, cardUrl) {
  const cardElement = document.querySelector('#card-template').content.cloneNode(true);
  cardElement.querySelector('.element__image').src = cardUrl;
  cardElement.querySelector('.element__title').textContent = cardName;
  cardElement.querySelector('.element__like').addEventListener('click', function (event) {
    event.target.classList.toggle('element__like_active');
  });
  cardElement.querySelector('.element').addEventListener('click', (evt) => { // слушатель, определяющий нажатие на карточку, кроме кнопки лайка и корзины
    if (!(evt.target.classList.contains('element__like') || evt.target.classList.contains('element__remove-button'))) {
      showPopupTypeImage();
      popupImageTypeImage.src = evt.target.closest('.element').querySelector('.element__image').src;
      popupTitleTypeImage.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
    }
  });
  elementsContainer.prepend(cardElement);
}

initialCards.forEach((item) => addCard(item.name, item.link));

editButton.addEventListener('click', showPopupTypeEdit);
popupTypeEditCloseButton.addEventListener('click', closePopupTypeEdit);
popupFormTypeEdit.addEventListener('submit', submitFormTypeEdit);

addButton.addEventListener('click', showPopupTypeAdd);
popupTypeAddCloseButton.addEventListener('click', closePopupTypeAdd);
popupFormTypeAdd.addEventListener('submit', submitFormTypeAdd);

popupTypeImageCloseButton.addEventListener('click', closePopupTypeImage);