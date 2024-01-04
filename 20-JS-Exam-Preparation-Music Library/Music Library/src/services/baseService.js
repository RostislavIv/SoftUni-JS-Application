export class BaseService {
  async _innerFetch(url, settings) {
    try {
      let response = await fetch(url, settings);
      if (!response.ok) {
        const err = await response.json();
        err.message ? alert(err.message) : alert(JSON.parse(err).message);
        return undefined;
      }
      if (response.status === 204) {
        return true;
      }
      const result = await response.json();
      return result;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }
}
