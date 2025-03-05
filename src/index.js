import "./pages/index.css";
import { deleteCard, toggleLike, createCard } from "./components/card.js";
import { openModal, closeModal, closeButtonPopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getToCards,
  requestDeleteCard,
  changeDataProfileOnServer,
  getUserInfo,
  addNewCardOnServer,
  requestToggleLike,
  requestUpdateAvatar,
} from "./components/api.js";

const cardsContainer = document.querySelector(".places__list");
const editProfileForm = document.forms["edit-profile"];
const addNewPlaceForm = document.forms["new-place"];
const updateAvatarForm = document.forms["update"];
const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const addCardButton = document.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const imageCaption = document.querySelector(".popup__caption");
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const imgPlaceInput = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup__image");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileImage = document.querySelector(".profile__image");
const updateAvatarPopup = document.querySelector(".popup_type_update");
const updateAvatarButton = document.querySelector(".update__avatar-button");
let userId = null;

//Объект с данными валидации
const dataForValidity = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(dataForValidity);

//Обработка запросов на получение данных о карточках и пользователях
Promise.all([getToCards(), getUserInfo()])
  .then(([cards, user]) => {
    userId = user._id;
    nameProfile.textContent = user.name;
    jobProfile.textContent = user.about;
    profileImage.src = user.avatar;
    renderCards(cards);
  })
  .catch((e) => {
    console.log(e);
  });

//Отрисовка карточек на странице
function renderCards(cards) {
  cards.forEach((element) => {
    cardsContainer.append(
      createCard(
        element,
        deleteCard,
        toggleLike,
        showImageModal,
        userId,
        requestToggleLike,
        requestDeleteCard,
        openModal
      )
    );
  });
}

//Функция открытия попапа с картинкой
export function showImageModal(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  imageCaption.textContent = name;
  openModal(popupTypeImage);
}

//Функция добавления новой карточки в начало
function handleNewPlaceFormSubmit(e) {
  e.preventDefault();
  e.target.querySelector(".button").textContent = "Сохранить...";
  addNewCardOnServer(placeNameInput.value, imgPlaceInput.value)
    .then((data) => {
      cardsContainer.prepend(
        createCard(
          data,
          deleteCard,
          toggleLike,
          showImageModal,
          userId,
          requestToggleLike,
          requestDeleteCard,
          openModal
        )
      );
      clearValidation(
        popupAddNewCard.querySelector(".popup__form"),
        dataForValidity
      );
      addNewPlaceForm.reset();
      closeModal(popupAddNewCard);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally((e.target.querySelector(".button").textContent = "Сохранить"));
}

//Функция обновления данных профиля
function handleEditFormSubmit(e) {
  e.preventDefault();

  e.target.querySelector(".button").textContent = "Сохранить...";

  //Редактирование данных пользователя на сервере***
  changeDataProfileOnServer(nameInput.value, jobInput.value)
    .then((data) => {
      addProfileData();
      closeModal(popupEditProfile);
    })
    .catch((e) => console.log(e))
    .finally((e.target.querySelector(".button").textContent = "Сохранить"));
}

//Функция смены аватара
function handleUpdateAvatar(e) {
  e.preventDefault();

  e.target.querySelector(".button").textContent = "Сохранить...";
  requestUpdateAvatar(
    updateAvatarForm.querySelector(".popup__input_type_url").value
  )
    .then((data) => {
      profileImage.src = updateAvatarForm.querySelector(
        ".popup__input_type_url"
      ).value;
      closeModal(updateAvatarPopup);
    })
    .catch((e) => console.log(e))
    .finally((e.target.querySelector(".button").textContent = "Сохранить"));
}

// Обработчик нажатия на кнопку "Сохранить" при редактировании профиля
editProfileForm.addEventListener("submit", handleEditFormSubmit);

// Обработчик нажатия на кнопку "Сохранить" при обновлении аватара
updateAvatarForm.addEventListener("submit", handleUpdateAvatar);

// Обработчик нажатия на кнопку "Сохранить" при добавлении карточки
addNewPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

// Открытие попапа редактирования пользователя на кнопку
editProfileButton.addEventListener("click", () => {
  openAndValidityPopup(popupEditProfile);
  changeProfileData();
});

// Открытие попапа обновления аватара
updateAvatarButton.addEventListener("click", () =>
  openAndValidityPopup(updateAvatarPopup)
);

// Открытие попапа добавления карточки на кнопку +
addCardButton.addEventListener("click", () =>
  openAndValidityPopup(popupAddNewCard)
);

//Закрытие на кнопку крестик для попапов
closeButtonPopup(updateAvatarPopup);
closeButtonPopup(popupEditProfile);
closeButtonPopup(popupAddNewCard);
closeButtonPopup(popupTypeImage);

// Функции заполнения строчек имени и професии из попапа и наоборот
function changeProfileData() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function addProfileData() {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

function openAndValidityPopup(popup) {
  clearValidation(popup.querySelector(".popup__form"), dataForValidity);
  openModal(popup);
}
