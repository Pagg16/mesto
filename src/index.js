import "./pages/index.css";

import { Card } from "./scripts/Card.js"; //импортируем генератор карточек

import { FormValidator } from "./scripts/FormValidator.js"; //импортируем валидацию

import { Section } from "./scripts/Section.js";

import { PopupWithImage } from "./scripts/PopupWithImage.js";

import { PopupWithForm } from "./scripts/PopupWithForm.js";

import { Popup } from "./scripts/Popup.js";

import { UserInfo } from "./scripts/UserInfo.js";

import { popupdelete } from "./utils/constans.js";

import {
  dataNamingConfiuration,
  dataNamingClass,
  namingСonfigurator,
  popupProfile,
  popupPosts,
  openPopupButton,
  openPopupButtonPost,
  popupEdit,
  profileEdit,
  buttonProfileAvatar,
  buttonProfileInfo,
  buttonCardCreation,
  buttonDeliteСonfirmation,
} from "./utils/constans.js";

import { Api } from "./scripts/Api.js";

//Данные пользователя==================================================================================================================================================
const userInfo = new UserInfo({
  nameUsers: ".profile-info__title",
  informUsers: ".profile-info__subtitle",
  avatarUser: ".profile__avatar",
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-29",
  headers: {
    authorization: "056e8062-0d04-4d77-b94c-9ff9ca769110",
    "Content-Type": "application/json",
  },
});

//Загрузка имени и рода деятельности с сервера========================================================
const userLink = api.getinfouser();

userLink.then((data) => {
  userInfo.setUserInfo({ name: data.name, job: data.about });
  userInfo.setUserAvatar({ avatarUser: data.avatar });
});
//========================================================================

//Функция открытия попапа с картинкой вместе с созданием каточки с попапом===================================================================================================================================================
const openImage = new PopupWithImage(namingСonfigurator.popupImage); //popop-image

function handleImageClick(name, link) {
  const data = {
    name,
    link,
  };

  openImage.open(data);
}

//Код отвечающий за генерацию карточек====================================================================
const cardPost = new Section(function (item) {
  renderCard(item);
}, namingСonfigurator.postsElement);

function renderCard(item) {
  const card = createCard(item);

  const cardElement = card.generateCard();

  cardPost.addItem(cardElement);
}

const createCard = (data) => {
  return new Card(
    data,
    namingСonfigurator.postElement,
    handleImageClick,
    dataNamingClass,
    api,
    userLink,
    function (data) {
      popupdelete.addEventListener("mousedown", popupDelite);
      popup.open();
      function popupDelite() {
        data();
        popup.close();
        popupdelete.removeEventListener("mousedown", popupDelite);
      }
    },
    textContentChange,
    buttonDeliteСonfirmation
  );
};
//=======================================================================================================

//Функция генерации карточек с сервера================================================================================================================================================
const cardLink = api.getInitialCards();

cardLink.then((data) => {
  cardPost.renderItems(data);
});

//Генерация карточек из попапа================================================================================================================================================

const verifiableForm = new FormValidator(dataNamingConfiuration, popupPosts);

verifiableForm.enableValidation();

const popupSubmitCard = new PopupWithForm(
  namingСonfigurator.popupPosts,

  (data) => {
    textContentChange(buttonCardCreation);
    api
      .sendingCardServer(data)
      .then((card) => {
        renderCard(card);
      })
      .finally(() => {
        textContentChange(buttonCardCreation);
        popupSubmitCard.close();
      });
  }
);
popupSubmitCard.setEventListeners();

function openAddCard() {
  verifiableForm.clearingErrorFields();

  popupSubmitCard.open();
}

openPopupButtonPost.addEventListener("click", openAddCard);
//=====================================================================================================================================================

//Попап с редактированием имени и работы=============================================================================================================================================================

const popupSubmit = new PopupWithForm(
  namingСonfigurator.popupProfile,
  function (data) {
    textContentChange(buttonProfileInfo);
    api
      .getinfouserDispatch(data)
      .then(() => {
        userInfo.setUserInfo(data);
      })
      .finally(() => {
        textContentChange(buttonProfileInfo);
        popupSubmit.close();
      });
  }
);

const verifiableFormProfile = new FormValidator(
  dataNamingConfiuration,
  popupProfile
);

verifiableFormProfile.enableValidation();

popupSubmit.setEventListeners();

function openProfilePopup() {
  verifiableFormProfile.clearingErrorFields();

  const data = userInfo.getUserInfo();

  for (const key in data) {
    popupSubmit.form.elements[key].value = data[key];
  }

  popupSubmit.open();
}

openPopupButton.addEventListener("click", openProfilePopup); // открытие попапов с вводом имени и работы
//=============================================================================================================================================================

//Обновление аватара пользователя========================================================================
const popupOpenEditProfile = new PopupWithForm(
  namingСonfigurator.popupProfileEdit,
  function (data) {
    textContentChange(buttonProfileAvatar);
    api
      .dispatchAvatarUser(data)
      .then(() => {
        userInfo.setUserAvatar({ avatarUser: data.edit });
      })
      .finally(() => {
        textContentChange(buttonProfileAvatar);
        popupOpenEditProfile.close();
      });
  }
);

const verifiableFormEditProfile = new FormValidator(
  dataNamingConfiuration,
  popupEdit
);

popupOpenEditProfile.setEventListeners();

verifiableFormEditProfile.enableValidation();

function openPopupEditProfile() {
  verifiableFormEditProfile.clearingErrorFields();
  popupOpenEditProfile.open();
}

profileEdit.addEventListener("mousedown", openPopupEditProfile);
//===============================================================================================================

//Создание попапа подтверждения удаления карточки==================================================================

const popup = new Popup(namingСonfigurator.deleteConfirmation);

popup.setEventListeners();

//=================================================================================================================

//Функция изменения текст контента кнопок во время связи с сервером=================================================

let textDefault;

function textContentChange(button) {
  if (button.textContent === "Да") {
    if (button.textContent === "Удаление...") {
      button.textContent = textDefault;
    } else {
      textDefault = button.textContent;
      button.textContent = "Удаление...";
    }
  } else {
    if (button.textContent === "Сохранение...") {
      button.textContent = textDefault;
    } else {
      textDefault = button.textContent;
      button.textContent = "Сохранение...";
    }
  }
}

//===================================================================================================================
