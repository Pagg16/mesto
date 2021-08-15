let closePopupButton = document.querySelector(".popup__button-close");
let popup = document.querySelector(".popup");
let openPopupButton = document.querySelector(".edit-button");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="job"]');
let profileInfoTitle = document.querySelector(".profile-info__title");
let profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

function togglePopup() {

  popup.classList.toggle("popup__opened");

  if (popup.classList.contains("popup__opened")) {
    jobInput.value = profileInfoSubtitle.textContent;
    nameInput.value = profileInfoTitle.textContent;
  }
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

function formSubmitHandler(evt) {

  evt.preventDefault();

  profileInfoTitle.textContent = nameInput.value;
  profileInfoSubtitle.textContent = jobInput.value;

  togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
