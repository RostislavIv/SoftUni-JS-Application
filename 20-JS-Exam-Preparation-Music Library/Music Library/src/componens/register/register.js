export class RegisterComponent {
  constructor(authService, mainRender, registerTemp, router) {
    this.authService = authService;
    this.mainRender = mainRender;
    this.registerTemp = registerTemp;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.registerHendler = this._registerHendler.bind(this);
  }

  _showView() {
    const tepmlate = this.registerTemp(this.registerHendler);
    this.mainRender(tepmlate);
  }

  async _registerHendler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
      rePass: formData.get("re-password"),
    };
    if (user.password == "" || user.email == "" || user.rePass == "") {
      alert("Email and password must not be empty");
      return;
    }
    if (user.password != user.rePass) {
      alert("Password and repeat password must by equal");
      return;
    }
    if (!(await this.authService.register(user))) {
      return;
    }
    this.router.show("/dashboard");
  }
}
