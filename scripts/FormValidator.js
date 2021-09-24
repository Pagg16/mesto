export class FormValidator {
  constructor(dataNamingConfiuration, formElement) {
    this._formSelector = dataNamingConfiuration.formSelector;
    this._inputSelector = dataNamingConfiuration.inputSelector;
    this._submitButtonSelector = dataNamingConfiuration.submitButtonSelector;
    this._inactiveButtonClass = dataNamingConfiuration.inactiveButtonClass;
    this._inputErrorClass = dataNamingConfiuration.inputErrorClass;
    this._errorClass = dataNamingConfiuration.errorClass;
    this._formElement = formElement;
  }

  // Функция принимает массив полей
  _hasInvalidInput = (inputList) => {
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
  _toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true); //отключаем кнопку если все плохо
      buttonElement.classList.remove("popup__submit-button_hover"); //удаляем активацию при наведении у кнопки
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled"); //активируем кнопку если все хорошо
      buttonElement.classList.add("popup__submit-button_hover"); //добавляем активацию при наведении у кнопки
    }
  };

  // Функция, которая добавляет класс с ошибкой
  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    errorElement.textContent = errorMessage; // присваеваем браузерный текст ошибки
    errorElement.classList.add(this._errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(this._errorClass);
    // Очистим ошибку
    errorElement.textContent = "";
  };

  // Функция, которая проверяет валидность поля
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    // Находим все поля внутри формы,
    // сделаем из них массив
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    // Найдём в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState(inputList, buttonElement);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
        this._formElement.addEventListener("submit", (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
        });
      // Для формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      this._setEventListeners();
  };
}

export function clearingErrorFields(evt) {
    if (!evt.classList.contains("popup-images")) {// очищаем форму при услови, что это не попап с картинкой
      // функция очистки ошибок в форме, если пользователь ввел данные и нажал крестик,а потом опять открыл попап с формой
      const inputElement = evt.querySelectorAll(".popup__filed");
  
      const formReset = evt.querySelector(".popup__form");
  
      inputElement.forEach((data) => {
        data.classList.remove("popup__input_type_error"); // удаляем подчеркивание краным цветом у двх элементов инпут
        evt
          .querySelector(`.${data.id}-error`)
          .classList.remove("popup__error_visible"); //скрываем ошибку
      });
  
      formReset.reset();
    }
  }