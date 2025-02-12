// Функция заполнения строчек имени и професии из попапа либо наоборот в зависимости от переданного флага
export default function changeOrAddProfile(flag) {
  const nameProfile = document.querySelector(".profile__title");
  const jobProfile = document.querySelector(".profile__description");
  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");
  if (flag) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  } else {
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
  }
}
