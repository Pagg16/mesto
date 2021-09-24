import { Card } from "./Card.js"; //импортируем генератор карточек

import { FormValidator, clearingErrorFields } from "./FormValidator.js"; //импортируем валидацию

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

const popupForm = document.querySelectorAll(".popup__form"); //попап форма

const dataNamingConfiuration = {
  // конфигурация названий классов
  formSelector: ".popup__form",
  inputSelector: ".popup__filed",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popup = document.querySelectorAll(".popup"); // переменная с попапами
const popupProfile = document.querySelector(".popup-profile"); // попап редактирования профиля
const popupPosts = document.querySelector(".popup-posts"); // попап добавления поста

const openPopupButton = document.querySelector(".button_type_edit"); // кнопка отправки данных об имени и работе
const openPopupButtonPost = document.querySelector(".button_type_add"); // кнопка открытия окна для публикации поста

const formElementCards = document.querySelector(".form-cards"); //форма карточки
const formElementProfile = document.querySelector(".form-profile"); //форма профиля

const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="job"]');
const profileInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

const postsElement = document.querySelector(".elements"); //контейнер для постов

const titleInput = document.querySelector('input[name="title"]'); //поле текста карточки
const linknput = document.querySelector('input[name="link"]'); //поле ссылки на картинку

initialCards.forEach((item) => {
   // генерируем карты из массива
  // Добавляем в DOM
  renderCard(createCard(item));
});

function createCard(item) {
 // генерируем карты из массива
 const card = new Card(item, "post-element");
 const cardElement = card.generateCard();

 return cardElement;
}

function renderCard(cardElement) {
    // Добавляем в DOM
    postsElement.prepend(cardElement);
}

popupForm.forEach((formElement) => {
  //запускаем валидацию форм

  const verifiableForm = new FormValidator(dataNamingConfiuration, formElement);

  verifiableForm.enableValidation();
});

const submitProfileForm = () => {

  const data = {
    name: titleInput.value,
    link: linknput.value,
  };
  
  // Добавляем в DOM
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
    const popupActive = document.querySelector(".popup_opened"); //находим открытый попап
    closePopup(popupActive); //закрываем его
  }
};

export function openPopup(openPopupName) {
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

function closePopup(closePopupName) {
  closePopupName.classList.remove("popup_opened");

  clearingErrorFields(closePopupName); //отправляем данные в функцию очистки формы

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
    }
  });
});
