export class NavComponent {
  constructor(authService, renderHendler, templateFunction, router) {
    this.authService = authService;
    this.renderHendler = renderHendler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.logoutHendler = this._logoutHendler.bind(this);
  }

  _showView(ctx, next) {
    const isLog = this.authService.isLog();
    const template = this.templateFunction(isLog, this.logoutHendler);
    this.renderHendler(template);
    next();
  }

  async _logoutHendler() {
    await this.authService.logout();
    this.router.navigate("/");
  }
}
