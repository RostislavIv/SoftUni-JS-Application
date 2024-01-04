export class SessionService {
  setUser(user) {
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("_id", user._id);
    sessionStorage.setItem("accessToken", user.accessToken);
  }

  getUser() {
    user = {
      email: sessionStorage.getItem("email"),
      _id: sessionStorage.getItem("_id"),
      accessToken: sessionStorage.getItem("accessToken"),
    };
    return user;
  }

  removeUser() {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("_id");
    sessionStorage.removeItem("accessToken");
  }

  getAccessToken() {
    return sessionStorage.getItem("accessToken");
  }

  isLog() {
    return sessionStorage.getItem("accessToken") ? true : false;
  }

  isOwner(ownerId) {
    return sessionStorage.getItem("_id") === ownerId;
  }
}
