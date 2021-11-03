import "./pages/index.css";

import { Card } from "./scripts/Card.js"; //импортируем генератор карточек

import { FormValidator } from "./scripts/FormValidator.js"; //импортируем валидацию

import { Section } from "./scripts/Section.js";

import { PopupWithImage } from "./scripts/PopupWithImage.js";

import { PopupWithForm } from "./scripts/PopupWithForm.js";

import { PopupDeleting } from "./scripts/PopupDeleting.js";

import { UserInfo } from "./scripts/UserInfo.js";

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

//Загрузка имени и рода деятельности + карточки с сервера========================================================
let IdUser;

Promise.all([api.getinfouser(), api.getInitialCards()])
  .then(([infoUser, initalCards]) => {
    IdUser = infoUser._id;
    userInfo.setUserInfo({ name: infoUser.name, job: infoUser.about });
    userInfo.setUserAvatar({ avatarUser: infoUser.avatar });
    cardPost.renderItems(initalCards);
  })
  .catch((err) => {
    console.log(err);
  });

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
  const card = new Card(
    data,
    namingСonfigurator.postElement,
    handleImageClick,
    dataNamingClass,
    function (linkfunction) {
      popupDeleting.open(linkfunction);
    },
    installLike,
    likeNumber,
    needBasketLink,
    function () {
      textContentChange(buttonDeliteСonfirmation, "Удаление...");
      api
        .cardDelLink(card._id)
        .then(() => {
          card.removePost();
          popupDeleting.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          textContentChange(buttonDeliteСonfirmation, "Да");
        });
    }
  );

  return card;
};
//=======================================================================================================

//Лайки========================================================================================
function installLike(event, id, element) {
  //установка лайка и снятие
  if (
    !event.target.classList.contains(dataNamingClass.rectangleButtonLikeActive)
  ) {
    api
      .cardLikeLink(id)
      .then((data) => {
        element.querySelector(dataNamingClass.numberLike).textContent =
          data.likes.length;
        event.target.classList.add(dataNamingClass.rectangleButtonLikeActive); //окрашиваем сердечко в черный цвет при помощи дополнительного класса
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .cardDelLikeLink(id)
      .then((data) => {
        element.querySelector(dataNamingClass.numberLike).textContent =
          data.likes.length;
        event.target.classList.remove(
          dataNamingClass.rectangleButtonLikeActive
        ); //окрашиваем сердечко в черный цвет при помощи дополнительного класса
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function likeNumber(likeOwner, element) {
  likeOwner.forEach((id) => {
    if (id._id === IdUser) {
      element
        .querySelector(dataNamingClass.rectangleButtonLike)
        .classList.add(dataNamingClass.rectangleButtonLikeActive);
    }
  });
}

function needBasketLink(mycardId, element) {
  if (IdUser === mycardId) {
    element
      .querySelector(dataNamingClass.buttonDelitePost)
      .classList.add(dataNamingClass.activeButtonClass);
  }
}
//============================================================================================================

//Генерация карточек из попапа================================================================================================================================================

const verifiableForm = new FormValidator(dataNamingConfiuration, popupPosts);

verifiableForm.enableValidation();

const popupSubmitCard = new PopupWithForm(
  namingСonfigurator.popupPosts,

  (data) => {
    textContentChange(buttonCardCreation, "Сохранение...");
    api
      .sendingCardServer(data)
      .then((card) => {
        renderCard(card);
        popupSubmitCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        textContentChange(buttonCardCreation, "Создание");
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
    textContentChange(buttonProfileInfo, "Сохранение...");
    api
      .getinfouserDispatch(data)
      .then(() => {
        userInfo.setUserInfo(data);
        popupSubmit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        textContentChange(buttonProfileInfo, "Сохранить");
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
    textContentChange(buttonProfileAvatar, "Сохранение...");
    api
      .dispatchAvatarUser(data)
      .then(() => {
        userInfo.setUserAvatar({ avatarUser: data.edit });
        popupOpenEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        textContentChange(buttonProfileAvatar, "Сохранить");
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

const popupDeleting = new PopupDeleting(
  namingСonfigurator.deleteConfirmation,
  buttonDeliteСonfirmation
);

popupDeleting.setEventListeners();

//=================================================================================================================

//Функция изменения текст контента кнопок во время связи с сервером=================================================

function textContentChange(button, text) {
  button.textContent = text;
}
//===================================================================================================================
