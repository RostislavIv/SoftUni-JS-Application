export class LoginComponent {
  constructor(authService, mainRender, loginTemp, router) {
    this.authService = authService;
    this.mainRender = mainRender;
    this.loginTemp = loginTemp;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.loginHendler = this._loginHendler.bind(this);
  }

  _showView() {
    const tepmlate = this.loginTemp(this.loginHendler);
    this.mainRender(tepmlate);
  }

  async _loginHendler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (user.password == "" || user.email == "") {
      alert("email and password must not be empty");
      return;
    }
    if (!(await this.authService.login(user))) {
      return;
    }
    this.router.show("/dashboard");
  }
}
