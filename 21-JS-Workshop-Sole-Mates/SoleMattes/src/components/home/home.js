export class HomeComponent {
  constructor(renderHendler, templateFunction) {
    this.renderHendler = renderHendler;
    this.templateFunction = templateFunction;
    this.showView = this._showView.bind(this);
  }

  _showView() {
    const template = this.templateFunction();
    this.renderHendler(template);
  }
}
