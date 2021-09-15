const initialCards = [
  //массив с карточками
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const closePopupButton = document.querySelectorAll(".popup__button-close"); // кнопки закрытия попапа
const popup = document.querySelectorAll(".popup"); // переменная с попапами
const popupProfile = document.querySelector(".popup-profile"); // попап редактирования профиля
const popupPosts = document.querySelector(".popup-posts"); // попап добавления поста
const popupImages = document.querySelector(".popup-images"); // попап открытия картинки
const popupContainer = document.querySelectorAll(".popup__container"); // переменная с контейнерами попапа

const openPopupButton = document.querySelector(".button_type_edit"); // кнопка отправки данных об имени и работе
const openPopupButtonPost = document.querySelector(".button_type_add"); // кнопка открытия окна для публикации поста

const formElementCards = document.querySelector(".form-cards"); //форма карточки
const formElementProfile = document.querySelector(".form-profile"); //форма профиля

const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="job"]');
const profileInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

const postTemplate = document.querySelector("#post-element").content;
const postsElement = document.querySelector(".elements"); //контейнер для постов

const titleInput = document.querySelector('input[name="title"]'); //поле текста карточки
const linknput = document.querySelector('input[name="link"]'); //поле ссылки на картинку

const popupForm = document.querySelectorAll(".popup__form"); //поле ссылки на картинку

const dataNamingConfiuration = {
  // конфигурация названий классов
  formSelector: ".popup__form",
  inputSelector: ".popup__filed",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function likePost(event) {
  event.target.classList.toggle("rectangle__button-like_active"); //окрашиваем сердечко в черный цвет при помощи дополнительного класса
}

const removePostHandler = (event) => {
  event.target.closest(".element").remove(); //удаляем карточку при нажатии на иконку
};

function createCard(data) {
  //собираем карточку с картинкой
  const postElement = postTemplate.querySelector(".element").cloneNode(true);
  postElement.querySelector(".element__image").src = data.link;
  postElement.querySelector(".element__image").alt = data.name;
  postElement.querySelector(".rectangle__text").textContent = data.name;
  postElement
    .querySelector(".element__button-delete-post")
    .addEventListener("click", removePostHandler);
  postElement
    .querySelector(".rectangle__button-like")
    .addEventListener("click", likePost);
  postElement
    .querySelector(".element__button-image-open")
    .addEventListener("click", openPopupImages);

  return postElement;
}

function renderCard(card) {
  postsElement.prepend(card);
}

initialCards.forEach((data) => {
  //перебираем все элементы пассива отправляя по очереди их в переменную data
  renderCard(createCard(data));
});

const submitProfileForm = () => {
  data = {
    name: titleInput.value,
    link: linknput.value,
  };

  renderCard(createCard(data));

  closePopup(popupPosts);

  formElementCards.reset();

  const buttonElement = document.querySelector(".popup__submit-button_post");
  buttonElement.classList.add(dataNamingConfiuration.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true); //отключаем кнопку после отправки формы
  buttonElement.classList.remove("popup__submit-button_hover"); //удаляем активацию при наведении у кнопки
};

const downKeydown = (evt) => {
  if (evt.key == "Escape") {
    const popupActive = document.querySelector(".popup_opened");//находим открытый попап 
    closePopup(popupActive); //закрываем его 
    clearingErrorFields(popupActive); //отправляем данные в функцию очистки формы 
  }
};

function openPopup(openPopupName) {
  //функция открытия попапов
  openPopupName.classList.add("popup_opened");

  document.addEventListener("keydown", downKeydown);
}

function openProfilePopup() {
  //функция открытия попапа с профилем и подтягивание данных из имени и рода деятельности в поля ввода
  jobInput.value = profileInfoSubtitle.textContent;
  nameInput.value = profileInfoTitle.textContent;
  openPopup(popupProfile);
}

function openPopupImages(event) {
  popupImages.querySelector(".popup__image-open").src = event.target.src;
  popupImages.querySelector(".popup__image-text").textContent =
    event.target.alt;
  popupImages.querySelector(".popup__image-open").alt = event.target.alt;
  openPopup(popupImages);
}

function closePopup(closePopupName) {
  closePopupName.classList.remove("popup_opened");

  document.removeEventListener("keydown", downKeydown);
}

function formSubmitHandler() {
  profileInfoTitle.textContent = nameInput.value;
  profileInfoSubtitle.textContent = jobInput.value;

  closePopup(popupProfile);
}

formElementProfile.addEventListener("submit", formSubmitHandler); // отправка формы с именем и работой
formElementCards.addEventListener("submit", submitProfileForm); // отправка формы с названием и фото
openPopupButton.addEventListener("click", openProfilePopup); // открытие попапов с вводом имени и работы
openPopupButtonPost.addEventListener("click", () => {
  openPopup(popupPosts);
}); //открытие попапа с добавлением картинки и названия

popup.forEach((elem) => {
  elem.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      closePopup(elem);
      if (!elem.classList.contains("popup-images")) {
        // очищаем форму при услови, что это не попап с картинкой
        clearingErrorFields(elem);
      }
    }
  });
});
