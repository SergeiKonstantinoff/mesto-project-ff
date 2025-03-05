export function enableValidation({ formSelector, ...otherDataValidity }) {
  const formList = Array.from(document.querySelectorAll(`${formSelector}`));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, otherDataValidity);
  });
}

const setEventListeners = (
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    ...otherDataValidity
  }
) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${inputSelector}`)
  );
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);

  // Это проверит состояние кнопки при первой загрузке страницы. Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, otherDataValidity);

      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//Включение или отключение кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Проверка валидности и передача ошибок
const checkInputValidity = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass, ...otherDataValidity }
) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(
      formElement,
      inputElement,
      inputElement.setCustomValidity(inputElement.dataset.errorMessage),
      inputErrorClass,
      errorClass
    );
  } else {
    showInputError(
      formElement,
      inputElement,
      inputElement.setCustomValidity(""),
      inputErrorClass,
      errorClass
    );
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//Показать ошибки валидации
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);

  if (inputElement.classList.contains("popup__input_type_url")) {
    errorElement.classList.add(`${errorClass}`);
  } else {
    errorElement.classList.add(`${errorClass}`);
    errorElement.textContent = errorMessage;
  }
};

//Скрыть ошибки валидации
const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);

  if (inputElement.classList.contains("popup__input_type_url")) {
    errorElement.classList.remove(`${errorClass}`);
  } else {
    errorElement.classList.remove(`${errorClass}`);
    errorElement.textContent = "";
  }
};

//Функция которая очищает ошибки валидации формы и делает кнопку неактивной
export function clearValidation(
  profileForm,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
    ...otherDataValidity
  }
) {
  submitButtonInactive(profileForm, submitButtonSelector, inactiveButtonClass);
  clearErrorMessage(profileForm, errorClass, inputErrorClass, inputSelector);
}

//Сделать кнопку неактивной
function submitButtonInactive(
  profileForm,
  submitButtonSelector,
  inactiveButtonClass
) {
  const submitButton = profileForm.querySelector(`${submitButtonSelector}`);
  submitButton.classList.add(`${inactiveButtonClass}`);
  submitButton.disabled = true;
}

// Функция очистки ошибок оставшихся после закрытия попапа
function clearErrorMessage(
  profileForm,
  errorClass,
  inputErrorClass,
  inputSelector
) {
  const inputList = Array.from(
    profileForm.querySelectorAll(`${inputSelector}`)
  );
  inputList.forEach((inputElement) => {
    const errorElement = profileForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${inputErrorClass}`);
    errorElement.classList.remove(`${errorClass}`);
  });
}
