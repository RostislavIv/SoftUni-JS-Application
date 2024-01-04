export class NavComponent {
  constructor(authService, navRender, navTemp, router) {
    this.authService = authService;
    this.navRender = navRender;
    this.navTemp = navTemp;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.logoutHendler = this._logoutHendler.bind(this);
  }

  _showView(ctx, next) {
    const isLog = this.authService.isLog();
    const tepmlate = this.navTemp(isLog, this.logoutHendler);
    this.navRender(tepmlate);
    next();
  }

  async _logoutHendler() {
    console.log("logout");
    await this.authService.logout();
    this.router.show("/dashboard");
  }
}
