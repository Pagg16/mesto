export class Card {
  constructor(data, cardSelector, handleImageClick, dataNamingClass) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;

    this._postElement = dataNamingClass.postElement;
    this._rectangleButtonLikeActive = dataNamingClass.rectangleButtonLikeActive;
    this._buttonDelitePost = dataNamingClass.buttonDelitePost;
    this._rectangleButtonLike = dataNamingClass.rectangleButtonLike;
    this._buttonImageOpen = dataNamingClass.buttonImageOpen;
    this._elementImage = dataNamingClass.elementImage;
    this._rectangleText = dataNamingClass.rectangleText;

    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const postElement = document
      .getElementById(this._cardSelector)
      .content.querySelector(this._postElement)
      .cloneNode(true);

    return postElement;
  }

  _removePost = (event) => {
    event.target.closest(this._postElement).remove(); //удаляем карточку при нажатии на иконку
  };

  _likePost(event) {
    event.target.classList.toggle(this._rectangleButtonLikeActive); //окрашиваем сердечко в черный цвет при помощи дополнительного класса
  }

  _setEventListeners() {
    this._element
      .querySelector(this._buttonDelitePost)
      .addEventListener("click", (event) => {
        this._removePost(event);
      });
    this._element
      .querySelector(this._rectangleButtonLike)
      .addEventListener("click", (event) => {
        this._likePost(event);
      });
    this._element
      .querySelector(this._buttonImageOpen)
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  generateCard() {
    //собираем карточку с картинкой
    this._element = this._getTemplate();

    this._element.querySelector(this._elementImage).src = this._link;
    this._element.querySelector(this._elementImage).alt = this._name;
    this._element.querySelector(this._rectangleText).textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
