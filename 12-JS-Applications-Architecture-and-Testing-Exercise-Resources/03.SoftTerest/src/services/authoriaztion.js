export function setUser({ accessToken, email, _id }) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("email", email);
  localStorage.setItem("userId", _id);
}

export function removeUser() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
}

export function getUser() {
  const user = {
    accessToken: localStorage.getItem("accessToken"),
    email: localStorage.getItem("email"),
    userId: localStorage.getItem("userId"),
  };
  return user;
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getEmail() {
  return localStorage.getItem("email");
}

export function getUserId() {
  return localStorage.getItem("userId");
}

export function isUser() {
  return localStorage.accessToken ? true : false;
}
