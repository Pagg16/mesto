import { openPopup } from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const postElement = document
      .getElementById(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return postElement;
  }

  _removePostHandler = (event) => {
    event.target.closest(".element").remove(); //удаляем карточку при нажатии на иконку
  };

  _likePost(event) {
    event.target.classList.toggle("rectangle__button-like_active"); //окрашиваем сердечко в черный цвет при помощи дополнительного класса
  }

  _openPopupImages(event) {
    const popupImages = document.querySelector(".popup-images");

    popupImages.querySelector(".popup__image-open").src = event.target.src;
    popupImages.querySelector(".popup__image-text").textContent =
      event.target.alt;
    popupImages.querySelector(".popup__image-open").alt = event.target.alt;

    openPopup(popupImages);
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__button-delete-post")
      .addEventListener("click", (event) => {
        this._removePostHandler(event);
      });
    this._element
      .querySelector(".rectangle__button-like")
      .addEventListener("click", (event) => {
        this._likePost(event);
      });
    this._element
      .querySelector(".element__button-image-open")
      .addEventListener("click", (event) => {
        this._openPopupImages(event);
      });
  }

  generateCard() {
    //собираем карточку с картинкой
    this._element = this._getTemplate();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".rectangle__text").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
