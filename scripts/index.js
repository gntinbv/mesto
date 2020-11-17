const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeEditCloseButton = document.querySelector('.popup__close_type_edit');
const popupTypeAddCloseButton = document.querySelector('.popup__close_type_add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupFormTypeEdit = document.querySelector('.popup__form_type_edit');
const popupFormTypeAdd = document.querySelector('.popup__form_type_add');
const nameFieldPopup = document.querySelector('.popup__input_type_name');
const titleFieldPopup = document.querySelector('.popup__input_type_title');
const urlFieldPopup = document.querySelector('.popup__input_type_url');
const descriptionFieldPopup = document.querySelector('.popup__input_type_description');
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

function addCard(cardName, cardUrl) {
  const cardElement = document.querySelector('#card-template').content.cloneNode(true);
  cardElement.querySelector('.element__image').src = cardUrl;
  cardElement.querySelector('.element__title').textContent = cardName;

  cardElement.querySelector('.element__like').addEventListener('click', function(event){
    event.target.classList.toggle('element__like_active');  
  })

  elementsContainer.append(cardElement);
}

initialCards.forEach((item) => addCard(item.name, item.link));



function showPopupTypeEdit() {
  popupTypeEdit.classList.add('popup_opened');
  nameFieldPopup.value = profileName.textContent;
  descriptionFieldPopup.value = profileDescription.textContent;
}
function showPopupTypeAdd() {
  popupTypeAdd.classList.add('popup_opened');
  titleFieldPopup.value = "";
  urlFieldPopup.value = "";
} 
function closePopupTypeEdit(event) {
  popupTypeEdit.classList.remove('popup_opened');
}
function closePopupTypeAdd(event) {
  popupTypeAdd.classList.remove('popup_opened');
}
function submitFormTypeEdit(event) {
  event.preventDefault(); /* этот код предотвращает выполнение действий браузера "по-умолчанию" помимо тех, что указали мы */
  profileName.textContent = nameFieldPopup.value;
  profileDescription.textContent = descriptionFieldPopup.value;
  closePopupTypeEdit()
}
function submitFormTypeAdd(event) {
  event.preventDefault(); /* этот код предотвращает выполнение действий браузера "по-умолчанию" помимо тех, что указали мы */
  closePopupTypeAdd()
}

editButton.addEventListener('click', showPopupTypeEdit);
addButton.addEventListener('click', showPopupTypeAdd);
popupTypeEditCloseButton.addEventListener('click', closePopupTypeEdit);
popupTypeAddCloseButton.addEventListener('click', closePopupTypeAdd);
popupFormTypeEdit.addEventListener('submit', submitFormTypeEdit);
popupFormTypeAdd.addEventListener('submit', submitFormTypeAdd);