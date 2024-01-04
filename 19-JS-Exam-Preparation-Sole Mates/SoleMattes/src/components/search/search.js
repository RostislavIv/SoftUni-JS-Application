export class SearchComponent {
  constructor(shoesService, renderHandler, templateFunction, router) {
    this.shoesService = shoesService;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.searchHendler = this._searchHendler.bind(this);
  }

  async _showView(ctx) {
    const query = ctx.querystring;
    const searchBrand = query.split("=")[1];
    const searchShoes = searchBrand
      ? await this.shoesService.getByBrand(searchBrand)
      : undefined;
    const isLog = this.shoesService.getUserId() ? true : false;
    const template = this.templateFunction(
      this.searchHendler,
      searchShoes,
      isLog
    );
    this.renderHandler(template);
  }

  _searchHendler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const searchBrand = formData.get("search");
    if (!searchBrand) {
      alert("field is empty");
      return;
    }
    this.router.navigate(`/search?brand=${searchBrand}`);
  }
}
