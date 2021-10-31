export class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    dataNamingClass,
    api,
    userLink,
    callbackDelete,
    textContentChange,
    buttonDeliteСonfirmation
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._api = api;
    this._userLink = userLink;

    this._data = data;

    this._mycardId = data.owner._id;
    this._handleImageClick = handleImageClick;

    this._likenNmber = data.likes.length;
    this._likeOwner = data.likes;
    this._postElement = dataNamingClass.postElement;
    this._rectangleButtonLikeActive = dataNamingClass.rectangleButtonLikeActive;
    this._buttonDelitePost = dataNamingClass.buttonDelitePost;
    this._rectangleButtonLike = dataNamingClass.rectangleButtonLike;
    this._buttonImageOpen = dataNamingClass.buttonImageOpen;
    this._elementImage = dataNamingClass.elementImage;
    this._rectangleText = dataNamingClass.rectangleText;
    this._numberLikeClass = dataNamingClass.numberLike;
    this._callbackDelete = callbackDelete;
    this._rectanglButtonLike = dataNamingClass.rectanglButtonLike;
    this._activeButtonClass = dataNamingClass.activeButtonClass;

    this._textContentChange = textContentChange;
    this._buttonDeliteСonfirmation = buttonDeliteСonfirmation;
  }

  _getTemplate() {
    const postElement = document
      .getElementById(this._cardSelector)
      .content.querySelector(this._postElement)
      .cloneNode(true);

    return postElement;
  }

  _removePost = () => {
    this._textContentChange(this._buttonDeliteСonfirmation);
    this._api
      .cardDelLink(this._id)
      .then(() => {
        this._element.remove(); //удаляем карточку
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._textContentChange(this._buttonDeliteСonfirmation);
      });
  };

  _likePost(event) {
    if (!event.target.classList.contains(this._rectangleButtonLikeActive)) {
      this._api
        .cardLikeLink(this._id)
        .then((data) => {
          this._element.querySelector(this._numberLikeClass).textContent =
            data.likes.length;
          event.target.classList.add(this._rectangleButtonLikeActive); //окрашиваем сердечко в черный цвет при помощи дополнительного класса
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .cardDelLikeLink(this._id)
        .then((data) => {
          this._element.querySelector(this._numberLikeClass).textContent =
            data.likes.length;
          event.target.classList.remove(this._rectangleButtonLikeActive); //окрашиваем сердечко в черный цвет при помощи дополнительного класса
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _likeNumber() {
    this._userLink.then((data) => {
      this._likeOwner.forEach((id) => {
        if (id._id === data._id) {
          this._element
            .querySelector(this._rectanglButtonLike)
            .classList.add(this._rectangleButtonLikeActive);
        }
      });
    });
  }

  _setEventListeners() {
    this._needBasket();

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

  _needBasket() {
    this._userLink.then((data) => {
      if (data._id === this._mycardId) {
        this._element
          .querySelector(this._buttonDelitePost)
          .classList.add(this._activeButtonClass);

        this._element
          .querySelector(this._buttonDelitePost)
          .addEventListener("click", () => {
            this._callbackDelete(this._removePost);
          });
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
      this._likenNmber;

    this._likeNumber();

    this._setEventListeners();

    return this._element;
  }
}
