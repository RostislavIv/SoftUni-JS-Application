export class SearchComponent {
  constructor(shoesService, renderHandler, templateFunction, router) {
    this.shoesService = shoesService;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.searchHendler = this._searchHendler.bind(this);
  }

  _showView() {
    const searchShoes = undefined;
    const template = this.templateFunction(this.searchHendler, searchShoes);
    this.renderHandler(template);
  }

  async _searchHendler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const searchBrand = formData.get("search");
    if (!searchBrand) {
      return;
    }
    const isLog = this.shoesService.getUserId() ? true : false;
    const searchShoes = await this.shoesService.getByBrand(searchBrand);
    const template = this.templateFunction(
      this.searchHendler,
      searchShoes,
      isLog
    );
    this.renderHandler(template);
  }
}
