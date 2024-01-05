export class EditComponent {
  constructor(shoesService, renderHendler, templateFunction, router) {
    this.shoesService = shoesService;
    this.renderHendler = renderHendler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.editHandler = this._editHandler.bind(this);
  }

  async _showView(ctx) {
    const id = ctx.params.id;
    const shoe = await this.shoesService.getById(id);
    const template = this.templateFunction(shoe, this.editHandler);
    this.renderHendler(template);
  }

  async _editHandler(e, id) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const shoe = {
      brand: formData.get("brand"),
      model: formData.get("model"),
      imageUrl: formData.get("imageUrl"),
      release: formData.get("release"),
      designer: formData.get("designer"),
      value: formData.get("value"),
    };
    if (Object.values(shoe).includes("")) {
      alert("All fields must not by empty");
      return;
    }
    await this.shoesService.edit(id, shoe);
    this.router.navigate(`/details/${id}`);
  }
}
