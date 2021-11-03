export class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    dataNamingClass,
    openCardDelLink,
    installLike,
    likeNumber,
    needBasketLink,
    delFunction
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;

    this._mycardId = data.owner._id;
    this._handleImageClick = handleImageClick;

    this._likenNmber = data.likes.length;
    this._likeOwner = data.likes;
    this._postElement = dataNamingClass.postElement;
    this._buttonDelitePost = dataNamingClass.buttonDelitePost;
    this._rectangleButtonLike = dataNamingClass.rectangleButtonLike;
    this._buttonImageOpen = dataNamingClass.buttonImageOpen;
    this._elementImage = dataNamingClass.elementImage;
    this._rectangleText = dataNamingClass.rectangleText;
    this._numberLikeClass = dataNamingClass.numberLike;

    this._openCardDelLink = openCardDelLink;
    this._installLike = installLike;

    this._likeNumber = likeNumber;
    this._needBasketLink = needBasketLink;
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

  _setEventListeners() {
    this._needBasket();

    this._element
      .querySelector(this._rectangleButtonLike)
      .addEventListener("click", (event) => {
        this._installLike(event, this._id, this._element);
      });

    this._element
      .querySelector(this._buttonImageOpen)
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  _needBasket() {
    this._needBasketLink(this._mycardId, this._element);

    if (this._element.querySelector(this._rectangleButtonLike)) {
      this._element
        .querySelector(this._buttonDelitePost)
        .addEventListener("click", () => {
          this._openCardDelLink(this._delFunction);
        });
    }
  }

  generateCard() {
    //собираем карточку с картинкой
    this._element = this._getTemplate();

    this._element.querySelector(this._elementImage).src = this._link;
    this._element.querySelector(this._elementImage).alt = this._name;
    this._element.querySelector(this._rectangleText).textContent = this._name;
    this._element.querySelector(this._numberLikeClass).textContent =
      this._likenNmber;

    this._likeNumber(this._likeOwner, this._element);

    this._setEventListeners();

    return this._element;
  }
}
