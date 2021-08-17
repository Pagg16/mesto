let closePopupButton = document.querySelector(".popup__button-close");
let popup = document.querySelector(".popup");
let openPopupButton = document.querySelector(".button_edit");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="job"]');
let profileInfoTitle = document.querySelector(".profile-info__title");
let profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

function addPopup() {
  //функция открытия попапа и присвоения значений имени и вида деятельностии к текстовым полям инпут
  popup.classList.add("popup_opened");

  jobInput.value = profileInfoSubtitle.textContent;
  nameInput.value = profileInfoTitle.textContent;
}

function removePopup() {
  //функция закрытия попапа
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileInfoTitle.textContent = nameInput.value;
  profileInfoSubtitle.textContent = jobInput.value;

  removePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
openPopupButton.addEventListener("click", addPopup);
closePopupButton.addEventListener("click", removePopup);
