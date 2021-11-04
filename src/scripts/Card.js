export class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    dataNamingClass,
    openCardDelLink,
    installLike,
    delFunction,
    idUser
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;

    this._mycardId = data.owner._id;
    this._handleImageClick = handleImageClick;

    this._likenNmbers = data.likes.length;
    this._likeOwner = data.likes;
    this._postElement = dataNamingClass.postElement;
    this._buttonDelitePost = dataNamingClass.buttonDelitePost;
    this._rectangleButtonLike = dataNamingClass.rectangleButtonLike;
    this._buttonImageOpen = dataNamingClass.buttonImageOpen;
    this._elementImage = dataNamingClass.elementImage;
    this._rectangleText = dataNamingClass.rectangleText;
    this._numberLikeClass = dataNamingClass.numberLike;
    this._rectangleButtonLikeActive = dataNamingClass.rectangleButtonLikeActive;
    this._activeButtonClass = dataNamingClass.activeButtonClass;

    this._idUser = idUser;

    this._openCardDelLink = openCardDelLink;
    this._installLike = installLike;

    this._delFunction = delFunction;
  }

  _getTemplate() {
    const postElement = document
      .getElementById(this._cardSelector)
      .content.querySelector(this._postElement)
      .cloneNode(true);

    return postElement;
  }

  removePost = () => {
    this._element.remove(); //удаляем карточку
    this._element = null;
  };

  addLike(data, element, event, numberLike, rectangleButtonLikeActive) {
    element.querySelector(numberLike).textContent = data.likes.length;
    event.target.classList.add(rectangleButtonLikeActive); //окрашиваем сердечко в черный цвет при помощи дополнительного класса
  }

  removeLike(data, element, event, numberLike, rectangleButtonLikeActive) {
    element.querySelector(numberLike).textContent = data.likes.length;
    event.target.classList.remove(rectangleButtonLikeActive); //удаляем окрашивание
  }

  _setEventListeners() {
    this._needBasket();

    this._element
      .querySelector(this._rectangleButtonLike)
      .addEventListener("click", (event) => {
        this._installLike(
          event,
          this._id,
          this._element,
          this.addLike,
          this.removeLike
        );
      });

    this._element
      .querySelector(this._buttonImageOpen)
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  _needBasket() {
    if (this._idUser === this._mycardId) {
      this._element
        .querySelector(this._buttonDelitePost)
        .classList.add(this._activeButtonClass);
    }

    if (this._element.querySelector(this._rectangleButtonLike)) {
      this._element
        .querySelector(this._buttonDelitePost)
        .addEventListener("click", () => {
          this._openCardDelLink(this._delFunction);
        });
    }
  }

  _likeNumber() {
    this._likeOwner.forEach((id) => {
      if (id._id === this._idUser) {
        this._element
          .querySelector(this._rectangleButtonLike)
          .classList.add(this._rectangleButtonLikeActive);
      }
    });
  }

  generateCard() {
    //собираем карточку с картинкой
    this._element = this._getTemplate();

    this._element.querySelector(this._elementImage).src = this._link;
    this._element.querySelector(this._elementImage).alt = this._name;
    this._element.querySelector(this._rectangleText).textContent = this._name;
    this._element.querySelector(this._numberLikeClass).textContent =
      this._likenNmbers;

    this._likeNumber();

    this._setEventListeners();

    return this._element;
  }
}
