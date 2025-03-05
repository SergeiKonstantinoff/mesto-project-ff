const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция удаления карточки
export function deleteCard(requestDeleteCard, id, card) {
  requestDeleteCard(id)
    .then(card.remove())
    .catch((e) => {
      console.log(e);
    });
}

// @todo: Функция "поставить лайк"
export function toggleLike(requestToggleLike, id, button, cardCountLikes) {
  if (!button.classList.contains("card__like-button_is-active")) {
    requestToggleLike(id, "PUT")
      .then((data) => {
        cardCountLikes.textContent = data.likes.length;
        button.classList.add("card__like-button_is-active");
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    requestToggleLike(id, "DELETE")
      .then((data) => {
        cardCountLikes.textContent = data.likes.length;
        button.classList.remove("card__like-button_is-active");
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

// @todo: Функция создания карточки
export function createCard(
  data,
  deleteCard,
  toggleLike,
  showImageModal,
  userId,
  requestToggleLike,
  requestDeleteCard
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardCountLikes = cardElement.querySelector(".card__count");

  if (userId === data.owner._id) {
    buttonDelete.addEventListener("click", () =>
      deleteCard(requestDeleteCard, data._id, cardElement)
    );
  } else {
    buttonDelete.remove();
  }

  cardImage.src = data.link;
  cardImage.alt = data.name;
  console.log(data.likes);
  cardCountLikes.textContent = data.likes.length;

  data.likes.forEach((like) => {
    if (like._id === userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  cardElement.querySelector(".card__title").textContent = data.name;

  cardImage.addEventListener("click", () =>
    showImageModal(data.link, data.name)
  );

  likeButton.addEventListener("click", () =>
    toggleLike(requestToggleLike, data._id, likeButton, cardCountLikes)
  );

  return cardElement;
}
