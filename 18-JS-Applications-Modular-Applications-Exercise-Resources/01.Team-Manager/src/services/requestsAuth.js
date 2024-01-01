import { getAccessToken, removeUser, setUser } from "./authorization.js";
import { innerFetch } from "./innerFetch.js";

const urlBase = "http://localhost:3030";

export async function loginRequest(email, password) {
  const urlLogin = `${urlBase}/users/login`;
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

export async function registerRequest(email, password, username) {
  const urlLogin = `${urlBase}/users/register`;
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
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
  const urlLogout = `${urlBase}/users/logout`;
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
