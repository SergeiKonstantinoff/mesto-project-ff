// @todo: Темплейт карточки

// @todo: DOM узлы
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// @todo: Функция "поставить лайк"
export function toggleLike(button) {
  button.classList.toggle("card__like-button_is-active");
}

// @todo: Функция создания карточки
export function createCard(data, deleteCard, toggleLike, showImageModal) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  cardImage.addEventListener("click", () =>
    showImageModal(data.link, data.name)
  );
  buttonDelete.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  return cardElement;
}
