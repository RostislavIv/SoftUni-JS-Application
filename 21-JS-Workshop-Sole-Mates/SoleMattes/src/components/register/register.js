import { UserReadableError } from "../../errors/UserReadableError.js";

export class RegisterComponent {
  constructor(authService, renderHendler, registerTemplate, router) {
    this.authService = authService;
    this.renderHendler = renderHendler;
    this.registerTemplate = registerTemplate;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.registerHendler = this._registerHendler.bind(this);
  }

  _showView() {
    const template = this.registerTemplate(this.registerHendler);
    this.renderHendler(template);
  }

  async _registerHendler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const rePass = formData.get("re-password");
    if (!email || !password || password != rePass) {
      alert("Email and Password must not by empty");
      return;
    }
    const user = { email, password };
    try {
      await this.authService.register(user);
      this.router.navigate("/dashboard");
    } catch (err) {
      if (err instanceof UserReadableError) {
        alert(err.message);
      }
    }
  }
}
