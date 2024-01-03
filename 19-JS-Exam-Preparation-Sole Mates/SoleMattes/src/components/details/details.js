export class DetailsComponent {
  constructor(shoeServer, renderHandler, templateFunction, route) {
    this.shoeServer = shoeServer;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.route = route;
    this.showView = this._showView.bind(this);
    this.deleteHandler = this._deleteHandler.bind(this);
  }

  async _showView(ctx) {
    const id = ctx.params.id;
    const shoe = await this.shoeServer.getById(id);
    const isOwner = shoe._ownerId === this.shoeServer.getUserId();
    const template = this.templateFunction(shoe, isOwner, this.deleteHandler);
    this.renderHandler(template);
  }

  async _deleteHandler(e, id) {
    await this.shoeServer.delete(id);
    this.route.navigate("/dashboard");
  }
}
