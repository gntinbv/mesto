function showError(form, input, config) { //функция, показывающая ошибку
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  error.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) { //функция, скрывающая ошибку
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = '';
  error.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(form, input, config) { //функция, проверящая валидность инпута
  if (!input.validity.valid) {
    showError(form, input, config);
  } else {
    hideError(form, input, config);
  }
}

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

function setEventListeners(form, config) {
  const inputsList = form.querySelectorAll(config.inputSelector); //добавляем в псевдомассив все найденные в одной из форм инпуты
  const submitButton = form.querySelector(config.submitButtonSelector); //добавляем в переменную кнопку отправки формы

  inputsList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector); //добавляем в псевдомассив все найденные формы
  forms.forEach((form) => {
    setEventListeners(form, config);

    /*  form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         console.log('отправка формы');
     }); */

    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config)
  });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', // настройки для поля ввода при ошибке
  errorClass: 'popup__error_visible' // настройки для сообщения ошибки
};

enableValidation(validationConfig);