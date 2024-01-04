export class EditComponent {
  constructor(albumsService, mainRender, editTemp, router) {
    this.albumsService = albumsService;
    this.mainRender = mainRender;
    this.editTemp = editTemp;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.editHendler = this._editHendler.bind(this);
  }

  async _showView(ctx) {
    const id = ctx.params.id;
    const album = await this.albumsService.getById(id);
    const tepmlate = this.editTemp(album, this.editHendler);
    this.mainRender(tepmlate);
  }

  async _editHendler(e, id) {
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
    const result = await this.albumsService.edit(id, album);
    if (!result) {
      return;
    }
    this.router.show("/dashboard");
  }
}
