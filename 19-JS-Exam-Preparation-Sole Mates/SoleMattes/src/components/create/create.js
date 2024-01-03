export class CreateComponent {
  constructor(shoesService, renderHendler, templateFunction, router) {
    this.shoesService = shoesService;
    this.renderHendler = renderHendler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.editHendler = this._editHendler.bind(this);
  }

  _showView() {
    const template = this.templateFunction(this.editHendler);
    this.renderHendler(template);
  }

  async _editHendler(e) {
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
    await this.shoesService.create(shoe);
    this.router.navigate("/dashboard");
  }
}
