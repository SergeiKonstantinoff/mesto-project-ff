export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  // popup.classList.add("popup_is-animated");
  popup.addEventListener("click", closeModalOnOverlay);
  document.addEventListener("keydown", closeModalOnEsc);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeModalOnOverlay);
  document.removeEventListener("keydown", closeModalOnEsc);
}

//Закрытие попапа на Esc
export function closeModalOnEsc(e) {
  if (e.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
//Закрытие попапа на оверлей
function closeModalOnOverlay(e) {
  if (e.currentTarget === e.target) {
    closeModal(e.target);
  }
}

//Функция закрытия на кнопку крестик
export function closeButtonPopup(popup) {
  // Поиск кнопки x внутри попапа
  const popupCloseButton = popup.querySelector(".popup__close");
  // Добавление обработчика на кнопку
  popupCloseButton.addEventListener("click", () => {
    closeModal(popup);
  });
}
