export class Popup {
  constructor(PopupSelector) {
    this._PopupSelector = document.querySelector(PopupSelector);
    this._openPopupClass = "popup_opened";
    this._popupButtonClose = "popup__button-close";
    this._popup = 'popup';
    this._setEventListeners = this.setEventListeners.bind(this);
    this._closeHandle = this._handleEscClose.bind(this);
  }

  open() {
    this._PopupSelector.classList.add(this._openPopupClass);

    document.addEventListener("keydown", this._closeHandle);
  }

  close() {
    this._PopupSelector.classList.remove(this._openPopupClass); //удаляем класс открытия попапа

    document.removeEventListener("keydown", this._closeHandle);

    this._PopupSelector.removeEventListener("mousedown", this._setEventListeners);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(); //закрываем его
    }
  }

  setEventListeners() {
    this._PopupSelector.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains(this._popup) ||
      evt.target.classList.contains(this._popupButtonClose)
    ) {
      this.close();
    }
    });
  }
}
