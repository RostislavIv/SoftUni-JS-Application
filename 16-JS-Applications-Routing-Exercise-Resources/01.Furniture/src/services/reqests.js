import {
  getAccessToken,
  getUser,
  isUser,
  removeUser,
  setUser,
} from "./authorization.js";

const url = "http://localhost:3030";

export async function getCatalogRequest() {
  const urlCatalog = `${url}/data/catalog`;
  const catalog = await innerFetch(urlCatalog, {});
  return catalog;
}

export async function getCatalogByOwnerRequest() {
  const user = getUser();
  const urlCatalog = `${url}/data/catalog?where=_ownerId%3D%22${user._id}%22`;
  const catalog = await innerFetch(urlCatalog, {});
  return catalog;
}

export async function getItemRequest(id) {
  const urlCatalog = `${url}/data/catalog/${id}`;
  const item = await innerFetch(urlCatalog, {});
  return item;
}

export async function createItemRequest(item) {
  const urlCatalog = `${url}/data/catalog`;
  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }
  const settings = {
    method: "POST",
    headers: {
      "X-Authorization": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };
  const resultItem = await innerFetch(urlCatalog, settings);
  return resultItem;
}

export async function updateItemRequest(id, item) {
  const urlCatalog = `${url}/data/catalog/${id}`;
  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }
  const settings = {
    method: "PUT",
    headers: {
      "X-Authorization": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };
  const resultItem = await innerFetch(urlCatalog, settings);
  return resultItem;
}

export async function deleteItemRequest(id) {
  const urlDelete = `${url}/data/catalog/${id}`;
  const accessToken = getAccessToken();
  const settings = {
    method: "DELETE",
    headers: {
      "X-Authorization": accessToken,
    },
  };
  const resultItem = await innerFetch(urlDelete, settings);
  return resultItem ? true : false;
}

export async function loginRequest(email, password) {
  const urlLogin = `${url}/users/login`;
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  const user = await innerFetch(urlLogin, settings);
  if (user) {
    setUser(user);
  }
  return user;
}

export async function registerRequest(email, password) {
  const urlLogin = `${url}/users/register`;
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  const user = await innerFetch(urlLogin, settings);
  if (user) {
    setUser(user);
  }
  return user;
}

export async function logoutRequest() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }
  const urlLogout = `${url}/users/logout`;
  const settings = {
    method: "GET",
    headers: { "X-Authorization": accessToken },
  };
  const isLogout = await innerFetch(urlLogout, settings);
  if (isLogout) {
    removeUser();
  }
  return isLogout;
}

async function innerFetch(url, settings) {
  try {
    const responce = await fetch(url, settings);
    if (responce.status == 204) {
      return true;
    }
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const result = await responce.json();
    return result;
  } catch (err) {
    console.log(err.message);
  }
}
