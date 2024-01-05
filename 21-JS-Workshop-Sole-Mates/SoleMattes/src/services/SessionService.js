const key = "accessToken";

export class SessionService {
  getAccessToken() {
    return sessionStorage.getItem("accessToken");
  }

  getUserId() {
    return sessionStorage.getItem("_id");
  }

  setAccessToken(accessToken, _id) {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("_id", _id);
  }

  removeAccessToken() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("_id");
  }
}
