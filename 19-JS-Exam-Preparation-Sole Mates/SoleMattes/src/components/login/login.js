import { UserReadableError } from "../../errors/UserReadableError.js";

export class LoginComponent {
  constructor(authService, renderHendler, templateFunction, router) {
    this.authService = authService;
    this.renderHendler = renderHendler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.loginHendler = this._loginHendler.bind(this);
  }

  _showView() {
    const template = this.templateFunction(this.loginHendler);
    this.renderHendler(template);
  }

  async _loginHendler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      alert("Email and Password must not by empty");
      return;
    }
    const user = { email, password };
    try {
      await this.authService.login(user);
      this.router.navigate("/");
    } catch (err) {
      if (err instanceof UserReadableError) {
        alert(err.message);
      }
    }
  }
}
