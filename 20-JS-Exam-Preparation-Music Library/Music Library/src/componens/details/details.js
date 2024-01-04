export class DetailsComponent {
  constructor(albumsService, mainRender, detailsTemp, router) {
    this.albumsService = albumsService;
    this.mainRender = mainRender;
    this.detailsTemp = detailsTemp;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.deleteHandler = this._deleteHandler.bind(this);
  }

  async _showView(ctx) {
    const id = ctx.params.id;
    const isLog = this.albumsService.isLog();
    const album = await this.albumsService.getById(id);
    const isOwner = this.albumsService.isOwner(album._ownerId);
    const tepmlate = this.detailsTemp(
      album,
      isLog,
      isOwner,
      this.deleteHandler
    );
    this.mainRender(tepmlate);
  }

  async _deleteHandler(id) {
    await this.albumsService.delete(id);
    this.router.show("/dashboard");
  }
}
