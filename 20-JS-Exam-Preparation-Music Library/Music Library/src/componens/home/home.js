export class HomeComponent {
  constructor(mainRender, homeTemp) {
    this.mainRender = mainRender;
    this.homeTemp = homeTemp;
    this.showView = this._showView.bind(this);
  }

  _showView() {
    const tepmlate = this.homeTemp();
    this.mainRender(tepmlate);
  }
}
