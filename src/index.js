import './pages/index.css';

import { Card } from "./scripts/Card.js"; //импортируем генератор карточек

import { FormValidator } from "./scripts/FormValidator.js"; //импортируем валидацию

import { Section } from "./scripts/Section.js";

import { Popup } from "./scripts/Popup.js";

import { PopupWithImage } from "./scripts/PopupWithImage.js";

import { PopupWithForm } from "./scripts/PopupWithForm.js";

import { UserInfo } from "./scripts/UserInfo.js";

import {
  dataNamingConfiuration,
  dataNamingClass,
  namingСonfigurator,
  initialCards,
  popupProfile,
  popupPosts,
  openPopupButton,
  openPopupButtonPost,
  whoIsTheGoat,
} from "./utils/constans.js";

function handleImageClick(name, link) {
  const data = {
    name,
    link,
  };

  const openImage = new PopupWithImage(namingСonfigurator.popupImage); //popop-image

  openImage.open(data);
}

const userInfo = new UserInfo({
  nameUsers: ".profile-info__title",
  informUsers: ".profile-info__subtitle",
});

//Функция генерации карточек================================================================================================================================================
const cardList = (items) => {
  const cardPost = new Section(
    {
      items: items,
      renderer: function (item) {
        const card = createCard(item);

        const cardElement = card.generateCard();

        cardPost.addItem(cardElement);
      },
    },
    namingСonfigurator.postsElement
  );

  return cardPost;
};

const createCard = (data) => {
  return new Card(
    data,
    namingСonfigurator.postElement,
    handleImageClick,
    dataNamingClass
  );
};
//===============================================================================================================================================

// отрисовка карточек из массива
cardList(initialCards).renderItems();

//Генерация карточек из попапа================================================================================================================================================
const verifiableForm = new FormValidator(dataNamingConfiuration, popupPosts);

verifiableForm.enableValidation();

const openAddCards = new Popup(namingСonfigurator.popupPosts);

const popupSubmitCard = new PopupWithForm(
  namingСonfigurator.popupPosts,

  (data) => {
    const elemMassive = [data];

    cardList(elemMassive).renderItems();
  }
);

popupSubmitCard.setEventListeners();

function openAddCard() {
  verifiableForm.clearingErrorFields();

  openAddCards.open();
}

openPopupButtonPost.addEventListener("click", openAddCard);
//=====================================================================================================================================================

//Попап с редактированием имени и работы=============================================================================================================================================================

const popupSubmit = new PopupWithForm(
  namingСonfigurator.popupProfile,
  function (data) {
    userInfo.setUserInfo(data);
  }
);

const verifiableFormProfile = new FormValidator(
  dataNamingConfiuration,
  popupProfile
);

verifiableFormProfile.enableValidation();

popupSubmit.setEventListeners();

const openProfilePopups = new Popup(namingСonfigurator.popupProfile);

function openProfilePopup() {
  verifiableFormProfile.clearingErrorFields();

  const data = userInfo.getUserInfo();

  for (const key in data) {
    popupSubmit.form.elements[key].value = data[key];
  }

  openProfilePopups.open();
}

openPopupButton.addEventListener("click", openProfilePopup); // открытие попапов с вводом имени и работы
//=============================================================================================================================================================
