export class CreateComponent {
  constructor(albumsService, mainRender, createTemp, router) {
    this.albumsService = albumsService;
    this.mainRender = mainRender;
    this.createTemp = createTemp;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.createHendler = this._createHendler.bind(this);
  }

  _showView() {
    const tepmlate = this.createTemp(this.createHendler);
    this.mainRender(tepmlate);
  }

  async _createHendler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const album = {
      singer: formData.get("singer"),
      album: formData.get("album"),
      imageUrl: formData.get("imageUrl"),
      release: formData.get("release"),
      label: formData.get("label"),
      sales: formData.get("sales"),
    };
    if (Object.values(album).includes("")) {
      alert("All fields must not be empty");
      return;
    }
    const result = await this.albumsService.create(album);
    if (!result) {
      return;
    }
    this.router.show("/dashboard");
  }
}
