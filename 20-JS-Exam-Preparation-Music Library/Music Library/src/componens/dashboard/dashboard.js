export class DashboardComponent {
  constructor(albumsService, mainRender, dashboardTemp) {
    this.albumsService = albumsService;
    this.mainRender = mainRender;
    this.dashboardTemp = dashboardTemp;
    this.showView = this._showView.bind(this);
  }

  async _showView() {
    const albums = await this.albumsService.getAll();
    const tepmlate = this.dashboardTemp(albums);
    this.mainRender(tepmlate);
  }
}
