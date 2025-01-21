// @todo: Темплейт карточки

// @todo: DOM узлы
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

function toggleLike(button) {
  button.classList.toggle("card__like-button_is-active");
}

// @todo: Функция создания карточки
function createCard({ name, link }, deleteCard, toggleLike) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  // Ловим клик на конкретном элементе и вызываем функцию
  buttonDelete.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  return cardElement;
}

initialCards.forEach((element) => {
  // @todo: Вывести карточки на страницу
  cardsContainer.append(createCard(element, deleteCard, toggleLike));
});
