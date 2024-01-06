export class LoginComponent {
  constructor(authService, mainRender, loginTemplate, router) {
    this.authService = authService;
    this.mainRender = mainRender;
    this.loginTemplate = loginTemplate;
    this.router = router;
    this.show = this._show.bind(this);
    this.loginHandler = this._loginHandler.bind(this);
  }

  _show() {
    const template = this.loginTemplate(this.loginHandler);
    this.mainRender(template);
  }

  async _loginHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (user.email == "" || user.password == "") {
      alert("User name and password must not by empty");
      return;
    }
    const result = await this.authService.login(user);
    if (result) {
      this.router.show("/");
    }
  }
}
