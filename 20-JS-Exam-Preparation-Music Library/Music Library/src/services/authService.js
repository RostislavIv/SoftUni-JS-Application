import { BaseService } from "./baseService.js";

export class AuthService extends BaseService {
  constructor(url, sessionService) {
    super(BaseService);
    this.url = url;
    this.sessionService = sessionService;
  }

  async login(user) {
    const url = this.url.login;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    const loginUser = await this._innerFetch(url, settings);
    if (loginUser) {
      this.sessionService.setUser(loginUser);
      return true;
    }
  }

  async register(user) {
    const url = this.url.register;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    const loginUser = await this._innerFetch(url, settings);
    if (loginUser) {
      this.sessionService.setUser(loginUser);
      return true;
    }
  }

  async logout() {
    const url = this.url.logout;
    const accessToken = this.sessionService.getAccessToken();
    const settings = {
      method: "GET",
      headers: { "X-Authorization": accessToken },
    };
    await this._innerFetch(url, settings);
    this.sessionService.removeUser();
  }

  isLog() {
    return this.sessionService.isLog();
  }

  isOwner(id) {
    return this.sessionService.isOwner(id);
  }
}
