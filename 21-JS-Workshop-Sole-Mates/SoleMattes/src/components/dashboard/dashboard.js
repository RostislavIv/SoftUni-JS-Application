export class DashboardComponent {
  constructor(shoesService, renderHendler, templateFunction) {
    this.shoesService = shoesService;
    this.renderHendler = renderHendler;
    this.templateFunction = templateFunction;
    this.showView = this._showView.bind(this);
  }

  async _showView() {
    const shoes = await this.shoesService.getAll();
    const template = this.templateFunction(shoes);
    this.renderHendler(template);
  }
}
