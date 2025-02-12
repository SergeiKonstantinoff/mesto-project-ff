import "./pages/index.css";
import { deleteCard, toggleLike, createCard } from "./components/card.js";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal, closeButtonPopup } from "./components/modal.js";
import changeOrAddProfile from "./components/changeOrAddProfile.js";

const cardsContainer = document.querySelector(".places__list");
const editProfileForm = document.forms["edit-profile"];
const addNewPlaceForm = document.forms["new-place"];
const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const addCardButton = document.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const imageCaption = document.querySelector(".popup__caption");
const cardName = document.querySelector(".popup__input_type_card-name");
const imgPlace = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup__image");

//Функция открытия попапа с картинкой
export function showImageModal(link, name) {
  popupImage.src = link;
  imageCaption.textContent = name;
  closeButtonPopup(popupTypeImage);
  openModal(popupTypeImage);
}

//Функция добавления новой карточки в начало
function handleNewPlaceFormSubmit(e) {
  e.preventDefault();
  const name = cardName.value;
  const link = imgPlace.value;
  popupImage.src = link;
  popupImage.alt = name;
  cardsContainer.prepend(
    createCard({ name, link }, deleteCard, toggleLike, showImageModal)
  );
  cardName.value = "";
  imgPlace.value = "";
  closeModal(popupAddNewCard);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardsContainer.append(
    createCard(element, deleteCard, toggleLike, showImageModal)
  );
});

function handleEditFormSubmit(e) {
  e.preventDefault();
  // Функция заполнения инпутов формы попапа из профиля (т.к. флаг false)
  changeOrAddProfile(false);
  closeModal(popupEditProfile);
}

// Обработчик нажатия на кнопку "Сохранить" при редактировании профиля
editProfileForm.addEventListener("submit", handleEditFormSubmit);

// Обработчик нажатия на кнопку "Сохранить" при добавлении карточки
addNewPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

//1 Попап Открытие попапа редактирования пользователя на кнопку
editProfileButton.addEventListener("click", () => {
  openModal(popupEditProfile);
  // Функция заполнения строчек имени и професии в профиле из попапа (т.к. флаг true)
  changeOrAddProfile(true);
});

//2 Попап Открытие попапа добавления карточки на кнопку +
addCardButton.addEventListener("click", () => {
  openModal(popupAddNewCard);
});

//Закрытие на кнопку крестик
closeButtonPopup(popupEditProfile);
closeButtonPopup(popupAddNewCard);
