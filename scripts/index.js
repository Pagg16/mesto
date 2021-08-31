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

let closePopupButton = document.querySelectorAll(".popup__button-close"); // кнопка закрытия попапа для ввода имени и работы
let popup = document.querySelectorAll(".popup"); // попап к которому мы добовляем класс открытия
let openPopupButton = document.querySelector(".button_type_edit"); // кнопка отправки данных об имени и работе

let openPopupButtonPost = document.querySelector(".button_type_add"); // кнопка открытия окна для публикации поста

let formElement = document.querySelectorAll(".popup__form");
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="job"]');
let profileInfoTitle = document.querySelector(".profile-info__title");
let profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

const postTemplate = document.querySelector("#post-element").content;
const postsElement = document.querySelector(".elements"); //контейнер для постов

let titleInput = document.querySelector('input[name="title"]'); //поле текста карточки
let linknput = document.querySelector('input[name="link"]'); //поле ссылки на картинку

const addPost = (post) => {
  //собираем карточку с картинкой
  const postElement = postTemplate.querySelector(".element").cloneNode(true);
  postElement.querySelector(".element__image").src = post.link;
  postElement.querySelector(".element__image").alt = post.name;
  postElement.querySelector(".rectangle__text").textContent = post.name;
  postElement
    .querySelector(".element__button-delete-post")
    .addEventListener("click", removePostHandler);
  postElement
    .querySelector(".rectangle__button-like")
    .addEventListener("click", likePost);
  postsElement.prepend(postElement);
  postElement
    .querySelector(".element__button-image-open")
    .addEventListener("click", openImage);
};

function openImage(event) {
  popup[2].classList.add("popup_opened");
  popup[2].querySelector(".popup__image_open").src = event.target.src;
  popup[2].querySelector(".popup__image-text").textContent = event.target.alt;
}

function likePost(event) {
  event.target.classList.toggle("rectangle__button-like_active"); //окрашиваем сердечко в черный цвет при помощи дополнительного класса
}

const removePostHandler = (event) => {
  event.target.closest(".element").remove(); //удаляем карточку при нажатии на иконку
};

initialCards.forEach((post) => {
  //перебираем все элементы пассива отправляя по очереди их в переменную post
  addPost(post);
});

const postingForm = (event) => {
  event.preventDefault();
  if (!titleInput.value == 0 && !linknput.value == 0) {
    //не создаем пустую карточку
    post = {
      name: titleInput.value,
      link: linknput.value,
    };
    addPost(post);
    removePopup();
    formElement[1].reset();
  }
};

function addPopup() {
  //функция открытия попапа и присвоения значений имени и вида деятельностии к текстовым полям инпут
  popup[0].classList.add("popup_opened"); // открываем 1 попап с вводом имени и работы из массива попапов
  jobInput.value = profileInfoSubtitle.textContent;
  nameInput.value = profileInfoTitle.textContent;
}

function postPopupOpen() {
  popup[1].classList.add("popup_opened"); // открываем 2 попап с вводом имени и работы из массива попапов
}

function removePopup() {
  //функция закрытия попапа
  if (popup[0].classList.contains("popup_opened")) {
    popup[0].classList.remove("popup_opened"); // закрываем 1 попап с вводом имени и работы из массива попапов
  } else if (popup[1].classList.contains("popup_opened")) {
    popup[1].classList.remove("popup_opened"); // закрываем 2 попап
  } else {
    popup[2].classList.remove("popup_opened"); // закрываем 3 попап
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileInfoTitle.textContent = nameInput.value;
  profileInfoSubtitle.textContent = jobInput.value;

  removePopup();
}

formElement[0].addEventListener("submit", formSubmitHandler); // отправка формы с именем и работой
formElement[1].addEventListener("submit", postingForm); // отправка формы с названием и фото
openPopupButton.addEventListener("click", addPopup); // открытие попапов с вводом имени и работы
openPopupButtonPost.addEventListener("click", postPopupOpen); //открытие попапа с добавлением картинки

closePopupButton.forEach((item) => {
  //я не понимаю как это заработало, повесил циклом на все кнопки обработчик закрытия
  item.addEventListener("click", () => {
    removePopup();
  });
});
