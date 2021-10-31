// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const activeheart = new URL("../images/active-heart.svg", import.meta.url);
const basketiconcolor = new URL(
  "../images/basket-icon-color.svg",
  import.meta.url
);
const basketicon = new URL("../images/basket-icon.svg", import.meta.url);
const closeIcon = new URL("../images/Close-Icon.svg", import.meta.url);
const cross = new URL("../images/cross.svg", import.meta.url);
const gridimage1 = new URL("../images/grid-image1.png", import.meta.url);
const gridimage2 = new URL("../images/grid-image2.png", import.meta.url);
const gridimage3 = new URL("../images/grid-image3.png", import.meta.url);
const hoverheart = new URL("../images/hover-heart.svg", import.meta.url);
const pencil = new URL("../images/pencil.svg", import.meta.url);
const profileimage = new URL("../images/profile-image.png", import.meta.url);
const rectangleimage = new URL(
  "../images/rectangle-image.svg",
  import.meta.url
);
const vector = new URL("../images/Vector.svg", import.meta.url);

export const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: "activeheart", image: activeheart },
  { name: "basketiconcolor", image: basketiconcolor },
  { name: "basketicon", image: basketicon },
  { name: "closeIcon", image: closeIcon },
  { name: "cross", image: cross },
  { name: "gridimage1", image: gridimage1 },
  { name: "gridimage2", image: gridimage2 },
  { name: "gridimage3", image: gridimage3 },
  { name: "hoverheart", image: hoverheart },
  { name: "pencil", image: pencil },
  { name: "profileimage", image: profileimage },
  { name: "rectangleimage", image: rectangleimage },
  { name: "vector", link: vector },
];

export const dataNamingConfiuration = {
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

export const dataNamingClass = {
  // конфигурация названий классов для карточки
  postElement: ".element",
  rectangleButtonLikeActive: "rectangle__button-like_active",
  buttonDelitePost: ".element__button-delete-post",
  rectangleButtonLike: ".rectangle__button-like",
  buttonImageOpen: ".element__button-image-open",
  elementImage: ".element__image",
  rectangleText: ".rectangle__text",
  numberLike: ".rectangle__like-number",
  rectanglButtonLike: ".rectangle__button-like",
  activeButtonClass :"element__button-delete-post_active",
};

export const namingСonfigurator = {
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
  popupImageText: ".popup__image-text",
  popupProfileEdit: ".avatar-edit",
  deleteConfirmation: ".delete-confirmation",
};

export const popupProfile = document.querySelector(
  namingСonfigurator.popupProfile
); // попап редактирования профиля
export const popupPosts = document.querySelector(namingСonfigurator.popupPosts); // попап добавления поста

export const openPopupButton = document.querySelector(
  namingСonfigurator.openPopupButton
); // кнопка отправки данных об имени и работе
export const openPopupButtonPost = document.querySelector(
  namingСonfigurator.openPopupButtonPost
); // кнопка открытия окна для публикации поста 

export const popupEdit = document.querySelector(".avatar-edit");//переменная попапа с редактированием картинки профиля 

export const profileEdit = document.querySelector(".profile__blackout");// иконка по нажатию на которую открывается попап редактирования картинки 

export const popupdelete = document.querySelector(".popup__submit-button_delete-confirmation");

export const buttonProfileAvatar = document.querySelector('.popup__submit-button_edit');

export const buttonProfileInfo = document.querySelector('.popup__submit-button');

export const buttonCardCreation = document.querySelector('.popup__submit-button_post');

export const buttonDeliteСonfirmation = document.querySelector('.popup__submit-button_delete-confirmation');
