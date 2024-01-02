import { BaseApyServices } from "./BaseApiService.js";

export class BaseCrudApiService extends BaseApyServices {
  constructor(baseUrl, path, sessionService) {
    super(baseUrl);
    this.resourceUrl = `${baseUrl}${path}`;
    this.sessionService = sessionService;
  }

  async getAll() {
    const url = this.resourceUrl;
    const settings = { method: "GET" };
    const result = await this._internalFetchJson(url, settings);
    return result;
  }

  async getById(id) {
    const url = `${this.resourceUrl}/${id}`;
    const settings = { method: "GET" };
    const result = await this._internalFetchJson(url, settings);
    return result;
  }

  async create(item) {
    const url = this.resourceUrl;
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": this.sessionService.getAccessToken(),
      },
      body: JSON.stringify(item),
    };
    const result = await this._internalFetchJson(url, settings);
    return result;
  }

  async edit(id, item) {
    const url = `${this.resourceUrl}/${id}`;
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": this.sessionService.getAccessToken(),
      },
      body: JSON.stringify(item),
    };
    const result = await this._internalFetchJson(url, settings);
    return result;
  }

  async delete(id) {
    const url = `${this.resourceUrl}/${id}`;
    const settings = {
      method: "DELETE",
      headers: {
        "X-Authorization": this.sessionService.getAccessToken(),
      },
    };
    const result = await this._internalFetchJson(url, settings);
    return result;
  }
}
