export class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._popupSubmitButtonHover = data.popupSubmitButtonHover;
    this._popopImage = data.popopImage;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

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
      buttonElement.classList.remove(this._popupSubmitButtonHover); //удаляем активацию при наведении у кнопки
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled"); //активируем кнопку если все хорошо
      buttonElement.classList.add(this._popupSubmitButtonHover); //добавляем активацию при наведении у кнопки
    }
  };

  // Функция, которая добавляет класс с ошибкой
  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    errorElement.textContent = errorMessage; // присваеваем браузерный текст ошибки
    errorElement.classList.add(this._errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

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
      this._showInputError(inputElement, inputElement.validationMessage);
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
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

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

  clearingErrorFields() {
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    // очищаем форму при услови, что это не попап с картинкой
    // функция очистки ошибок в форме, если пользователь ввел данные и нажал крестик,а потом опять открыл попап с формой
    const inputElement = this._formElement.querySelectorAll(
      this._inputSelector
    );

    const formReset = this._formElement.querySelector(this._formSelector);

    inputElement.forEach((data) => {
      data.classList.remove(this._inputErrorClass); // удаляем подчеркивание краным цветом у двх элементов инпут
      this._formElement
        .querySelector(`.${data.id}-error`)
        .classList.remove(this._errorClass); //скрываем ошибку
    });
    formReset.reset();

      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true); //отключаем кнопку после отправки формы
      buttonElement.classList.remove(this._popupSubmitButtonHover); //удаляем активацию при наведении у кнопки
  }
}
