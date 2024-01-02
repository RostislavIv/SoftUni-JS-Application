const key = "accessToken";

export class SessionService {
  getAccessToken() {
    return sessionStorage.getItem(key);
  }

  setAccessToken(accessToken) {
    sessionStorage.setItem(key, accessToken);
  }

  removeAccessToken() {
    sessionStorage.removeItem(key);
  }
}
