import { BaseService } from "./baseService.js";

export class AlbumService extends BaseService {
  constructor(url, sessionService) {
    super(BaseService);
    this.url = url;
    this.sessionService = sessionService;
  }

  async getAll() {
    const url = this.url.getAll;
    const settings = {
      method: "GET",
    };
    const albums = await this._innerFetch(url, settings);
    return albums;
  }

  async getById(id) {
    const url = `${this.url.pathAlbums}/${id}`;
    const settings = {
      method: "GET",
    };
    const albums = await this._innerFetch(url, settings);
    return albums;
  }

  async create(album) {
    const url = `${this.url.pathAlbums}`;
    const accessToken = this.sessionService.getAccessToken();
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(album),
    };
    const createdAlbum = await this._innerFetch(url, settings);
    return createdAlbum;
  }

  async edit(id, album) {
    const url = `${this.url.pathAlbums}/${id}`;
    const accessToken = this.sessionService.getAccessToken();
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(album),
    };
    const editedAlbum = await this._innerFetch(url, settings);
    return editedAlbum;
  }

  async delete(id) {
    const url = `${this.url.pathAlbums}/${id}`;
    const accessToken = this.sessionService.getAccessToken();
    const settings = {
      method: "DELETE",
      headers: {
        "X-Authorization": accessToken,
      },
    };
    const deletedAlbum = await this._innerFetch(url, settings);
    return deletedAlbum;
  }

  isLog() {
    return this.sessionService.isLog();
  }

  isOwner(id) {
    return this.sessionService.isOwner(id);
  }
}
