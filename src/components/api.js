const configApi = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "49202977-389f-45b9-b90d-4254929483bb",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что то пошло не так, код ошибки - ${res.status}`);
};

// Запрос для получения карточек
export const getToCards = () => {
  return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers,
  }).then(handleResponse);
};

//Запрос на удаление карточки в БД
export function requestDeleteCard(id) {
  return fetch(`${configApi.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: configApi.headers,
  });
}

// Редактирование данных пользователя на сервере
export const changeDataProfileOnServer = (name, about) => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
};

// Запрос данных профиля
export const getUserInfo = () => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    headers: {
      authorization: "49202977-389f-45b9-b90d-4254929483bb",
    },
  }).then(handleResponse);
};

//Добавление новой карточки
export const addNewCardOnServer = (name, link) => {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

//Запрос на постановку либо снятие лайка
export const requestToggleLike = (id, requestType) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${id}`, {
    method: requestType,
    headers: configApi.headers,
  });
};

//Запрос на обновление аватара
export const requestUpdateAvatar = (avatar) => {
  return fetch(`${configApi.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
};
