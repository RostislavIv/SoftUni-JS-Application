export class NavComponent {
  constructor(authService, headerRender, navTemplate, router) {
    this.authService = authService;
    this.headerRender = headerRender;
    this.navTemplate = navTemplate;
    this.router = router;
    this.show = this._show.bind(this);
    this.logoutHandler = this._logoutHandler.bind(this);
  }

  _show(ctx, next) {
    const isLog = this.authService.isLog();
    const template = this.navTemplate(isLog, this.logoutHandler);
    this.headerRender(template);
    next();
  }

  async _logoutHandler(e) {
    e.preventDefault();
    await this.authService.logout();
    this.router.show("/");
  }
}
