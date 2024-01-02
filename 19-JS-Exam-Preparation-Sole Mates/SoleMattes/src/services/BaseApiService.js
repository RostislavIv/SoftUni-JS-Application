//import { UserReadableError } from "../errors/UserReadableError.";

import { UserReadableError } from "../errors/UserReadableError.js";

export class BaseApyServices {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async _internalFetchJson(url, settings) {
    try {
      let response = await fetch(url, settings);
      if (response.status === 200) {
        return await response.json();
      } else if (response.status === 204) {
        return undefined;
      } else {
        let result = await response.json();
        throw new UserReadableError(result.message);
      }
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }
}
