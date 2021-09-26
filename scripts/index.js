import { Card } from "./Card.js"; //импортируем генератор карточек

import { FormValidator, clearingErrorFields } from "./FormValidator.js"; //импортируем валидацию

const dataNamingConfiuration = {
  // конфигурация названий классов для валидации
  formSelector: ".popup__form",
  inputSelector: ".popup__filed",
  popupSubmitButtonHover: "popup__submit-button_hover",
  popopImage: "popup-images",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const dataNamingClass = { // конфигурация названий классов для карточки 
postElement: ".element",
rectangleButtonLikeActive: "rectangle__button-like_active",
buttonDelitePost :".element__button-delete-post",
rectangleButtonLike :".rectangle__button-like",
buttonImageOpen :".element__button-image-open",
elementImage :".element__image",
rectangleText :".rectangle__text",
}

const namingСonfigurator = {
  //конфигурация классов
  popupProfile: ".popup-profile",
  popupPosts: ".popup-posts",
  openPopupButton: ".button_type_edit",
  openPopupButtonPost: ".button_type_add",
  formElementCards: ".form-cards",
  formElementProfile: ".form-profile",
  nameInput: 'input[name="name"]',
  jobInput: 'input[name="job"]',
  profileInfoTitle: ".profile-info__title",
  profileInfoSubtitle: ".profile-info__subtitle",
  postsElement: ".elements",
  titleInput: 'input[name="title"]',
  linknput: 'input[name="link"]',
  postElement: "post-element",
  buttonSubmitPost: ".popup__submit-button_post",
  popupSubmitButtonHover: "popup__submit-button_hover",
  openPopupClass: "popup_opened",
  popup: "popup",
  popupButtonClose: "popup__button-close",
  popupImage: ".popup-images",
  popupImageOpen: ".popup__image-open",
  popupImageText :".popup__image-text",
};

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

const popups = document.querySelectorAll(`.${namingСonfigurator.popup}`); // переменная с попапами
const popupProfile = document.querySelector(namingСonfigurator.popupProfile); // попап редактирования профиля
const popupPosts = document.querySelector(namingСonfigurator.popupPosts); // попап добавления поста

const openPopupButton = document.querySelector(
  namingСonfigurator.openPopupButton
); // кнопка отправки данных об имени и работе
const openPopupButtonPost = document.querySelector(
  namingСonfigurator.openPopupButtonPost
); // кнопка открытия окна для публикации поста

const formElementCards = document.querySelector(
  namingСonfigurator.formElementCards
); //форма карточки
const formElementProfile = document.querySelector(
  namingСonfigurator.formElementProfile
); //форма профиля

const nameInput = document.querySelector(namingСonfigurator.nameInput);
const jobInput = document.querySelector(namingСonfigurator.jobInput);
const profileInfoTitle = document.querySelector(
  namingСonfigurator.profileInfoTitle
);
const profileInfoSubtitle = document.querySelector(
  namingСonfigurator.profileInfoSubtitle
);

const postsElement = document.querySelector(namingСonfigurator.postsElement); //контейнер для постов

const titleInput = document.querySelector(namingСonfigurator.titleInput); //поле текста карточки
const linknput = document.querySelector(namingСonfigurator.linknput); //поле ссылки на картинку

const popupForms = document.querySelectorAll(
  dataNamingConfiuration.formSelector
); //попап форма

const popupImages = document.querySelector(namingСonfigurator.popupImage); //попап картинки

const popopImage = popupImages.querySelector(namingСonfigurator.popupImageOpen);

const popupImageText = popupImages.querySelector(namingСonfigurator.popupImageText);

const buttonElement = document.querySelector(
  namingСonfigurator.buttonSubmitPost
);

initialCards.forEach((item) => {
  // генерируем карты из массива
  // Добавляем в DOM
  const card = new Card(item, namingСonfigurator.postElement, handleImageClick, dataNamingClass);
  const cardElement = card.generateCard();

  insertCard(cardElement);
});

function insertCard(cardElement) {
  // Добавляем в DOM
  postsElement.prepend(cardElement);
}

popupForms.forEach((formElement) => {
  //запускаем валидацию форм

  const verifiableForm = new FormValidator(dataNamingConfiuration, formElement);

  verifiableForm.enableValidation();
});

function handleImageClick(name, link) {
  popopImage.src = link;
  popupImageText.textContent = name;
  popopImage.alt = name;

  openPopup(popupImages);
}

const submitProfileForm = () => {
  const data = {
    name: titleInput.value,
    link: linknput.value,
  };

  // Добавляем в DOM
  const card = new Card(data, namingСonfigurator.postElement, handleImageClick, dataNamingClass);
  const cardElement = card.generateCard();
  insertCard(cardElement);

  closePopup(popupPosts);

  formElementCards.reset();

  buttonElement.classList.add(dataNamingConfiuration.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true); //отключаем кнопку после отправки формы
  buttonElement.classList.remove(namingСonfigurator.popupSubmitButtonHover); //удаляем активацию при наведении у кнопки
};

const downKeydown = (evt) => {
  if (evt.key == "Escape") {
    const popupActive = document.querySelector(
      `.${namingСonfigurator.openPopupClass}`
    ); //находим открытый попап
    closePopup(popupActive); //закрываем его
  }
};

function openPopup(openPopupName) {
  //функция открытия попапов
  openPopupName.classList.add(namingСonfigurator.openPopupClass);

  document.addEventListener("keydown", downKeydown);
}

function openProfilePopup() {
  //функция открытия попапа с профилем и подтягивание данных из имени и рода деятельности в поля ввода
  jobInput.value = profileInfoSubtitle.textContent;
  nameInput.value = profileInfoTitle.textContent;
  openPopup(popupProfile);
}

function closePopup(closePopupName) {
  closePopupName.classList.remove(namingСonfigurator.openPopupClass);

  clearingErrorFields(closePopupName, dataNamingConfiuration); //отправляем данные в функцию очистки формы

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

popups.forEach((elem) => {
  elem.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains(namingСonfigurator.popup) ||
      evt.target.classList.contains(namingСonfigurator.popupButtonClose)
    ) {
      closePopup(elem);
    }
  });
});
