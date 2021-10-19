import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(PopupSelector, callback) {
    super(PopupSelector);
    this._callback = callback;

    this.form = this._PopupSelector.querySelector(".popup__form");

    this._inputData = this.form.querySelectorAll(".popup__filed");

  }

  _getInputValues() {
    const formInfo = {};

    this._inputData.forEach((elem) => {
      formInfo[elem.name] = elem.value;
    });

    return formInfo;
  }

  setEventListeners() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues()); //function (this._getInputValues()){ содержимое для обработки forminfo }
      this.close();
    }); // отправка формы
    super.setEventListeners();
  }

  close() {
    super.close();

    this.form.reset();
  }
}
