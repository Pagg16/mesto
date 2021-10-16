import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);

    this._imageTitle = this._PopupSelector.querySelector(".popup__image-text");
    this._image = this._PopupSelector.querySelector(".popup__image-open");
  }

  open({ name, link }) {

    this._image.src = link;
    this._image.alt = name;
    this._imageTitle.textContent = name;

    super.open();
  }
}
