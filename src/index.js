import './pages/index.css';

import { Card } from "./scripts/Card.js"; //импортируем генератор карточек

import { FormValidator } from "./scripts/FormValidator.js"; //импортируем валидацию

import { Section } from "./scripts/Section.js";

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

//Функция открытия попапа с картинкой вместе с созданием каточки с попапом===================================================================================================================================================
const openImage = new PopupWithImage(namingСonfigurator.popupImage); //popop-image

function handleImageClick(name, link) {
  const data = {
    name,
    link,
  };

  openImage.open(data);
}
//Данные пользователя==================================================================================================================================================
const userInfo = new UserInfo({
  nameUsers: ".profile-info__title",
  informUsers: ".profile-info__subtitle",
});

//Функция генерации карточек================================================================================================================================================
  const cardPost = new Section(
     function (item) {

        const card = createCard(item);

        const cardElement = card.generateCard();

        cardPost.addItem(cardElement);
    },
    namingСonfigurator.postsElement
  );


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
cardPost.renderItems(initialCards);

//Генерация карточек из попапа================================================================================================================================================
const verifiableForm = new FormValidator(dataNamingConfiuration, popupPosts);

verifiableForm.enableValidation();

const popupSubmitCard = new PopupWithForm(
  namingСonfigurator.popupPosts,

  (data) => {
    const elemMassive = [data];
    
    cardPost.renderItems(elemMassive);
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
    userInfo.setUserInfo(data);
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
