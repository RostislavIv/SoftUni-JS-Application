export function setUser(user) {
  sessionStorage.setItem("accessToken", user.accessToken);
  sessionStorage.setItem("email", user.email);
  sessionStorage.setItem("_id", user._id);
}

export function getUser() {
  const accessToken = sessionStorage.getItem("accessToken");
  const email = sessionStorage.getItem("email");
  const _id = sessionStorage.getItem("_id");
  const user = { accessToken, email, _id };
  return user;
}

export function removeUser(user) {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("_id");
}

export function isUser() {
  const isAccessToken = sessionStorage.getItem("accessToken") ? true : false;
  return isAccessToken;
}

export function getAccessToken() {
  const accessToken = sessionStorage.getItem("accessToken");
  return accessToken;
}
