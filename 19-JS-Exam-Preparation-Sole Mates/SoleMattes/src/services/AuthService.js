import { BaseApyServices } from "./BaseApiService.js";

export class AuthService extends BaseApyServices {
  constructor(baseUrl, sessionService) {
    super(baseUrl);
    this.baseUrl = baseUrl;
    this.sessionService = sessionService;
  }

  async login(user) {
    const url = `${this.baseUrl}/users/login`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    const result = await this._internalFetchJson(url, settings);
    this.sessionService.setAccessToken(result.accessToken, result._id);
    return result;
  }

  async register(user) {
    const url = `${this.baseUrl}/users/register`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    const result = await this._internalFetchJson(url, settings);
    this.sessionService.setAccessToken(result.accessToken, result._id);
    return result;
  }

  async logout() {
    const url = `${this.baseUrl}/users/logout`;
    const settings = {
      method: "GET",
      headers: {
        "X-Authorization": this.sessionService.getAccessToken(),
      },
    };
    const result = await this._internalFetchJson(url, settings);
    this.sessionService.removeAccessToken();
    return result;
  }

  isLog() {
    return this.sessionService.getAccessToken() != undefined;
  }
}
