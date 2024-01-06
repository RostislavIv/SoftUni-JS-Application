export class RegisterComponent {
  constructor(authService, mainRender, registerTemplate, router) {
    this.authService = authService;
    this.mainRender = mainRender;
    this.registerTemplate = registerTemplate;
    this.router = router;
    this.show = this._show.bind(this);
    this.registerHandler = this._registerHandler.bind(this);
  }

  _show() {
    const template = this.registerTemplate(this.registerHandler);
    this.mainRender(template);
  }

  async _registerHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      repass: formData.get("repass"),
    };
    if (user.username == "" || user.email == "" || user.password == "") {
      alert("User name and password must not by empty");
      return;
    }
    if (user.password != user.repass) {
      alert("Password and Confirm Password dont match");
      return;
    }
    const result = await this.authService.register(user);
    if (result) {
      this.router.show("/");
    }
  }
}
