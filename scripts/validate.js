// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);//отключаем кнопку если все плохо 
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');//активируем кнопку если все хорошо 
  }
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  // Показываем сообщение об ошибке
  errorElement.textContent = errorMessage; // присваеваем браузерный текст ошибки
  errorElement.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(errorClass);
  // Очистим ошибку
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (
  formElement,
  inputElement,
  inputSelector,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    // showInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(
      formElement,
      inputElement,
      inputErrorClass,
      errorClass
    );
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  // Находим все поля внутри формы,
  // сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(
        formElement,
        inputElement,
        inputSelector,
        inputErrorClass,
        errorClass
      );
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = document.querySelectorAll(config.formSelector);

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(
      formElement,
      config.inputSelector,
      config.submitButtonSelector,
      config.inactiveButtonClass,
      config.inputErrorClass,
      config.errorClass
    );
  });
};

// Вызовем функцию
enableValidation(dataNamingConfiuration);