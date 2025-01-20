// @todo: Темплейт карточки

// @todo: DOM узлы
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

// @todo: Функция удаления карточки
const deleteCard = (e) => {
  // Поиск кликнутого элемента внутри .card
  const card = e.target.closest(".card");
  card.remove(card);
};

const addLike = (e) => {
  e.target.classList.toggle("card__like-button_is-active");
};

// @todo: Функция создания карточки
function addCard(name, link, deleteCard, addLike) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  // Ловим клик на кокретном элементе и вызываем для него функцию удаления
  cardElement.querySelector(".card__delete-button").onclick = deleteCard;
  cardElement.querySelector(".card__like-button").onclick = addLike;
  return cardElement;
}

initialCards.forEach((element) => {
  // @todo: Вывести карточки на страницу
  cardList.append(addCard(element.name, element.link, deleteCard, addLike));
});
