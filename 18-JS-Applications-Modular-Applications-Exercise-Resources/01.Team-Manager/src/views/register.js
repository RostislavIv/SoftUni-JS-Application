import { html } from "../../node_modules/lit-html/lit-html.js";
import { registerRequest } from "../services/requestsAuth.js";
import { validatUserName, validateEmail, validatePassword } from "../utils.js";

export function showRegister(ctx) {
  const template = tempRegister(onRegister);
  ctx.render(template);

  async function onRegister(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, username, password, repass } = Object.fromEntries([
      ...formData.entries(),
    ]);
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validatUserName(username) ||
      password != repass
    ) {
      const div = document.querySelector(".error");
      div.style.display = "block";
      return;
    }
    try {
      await registerRequest(email, password, username);
      ctx.page.show("/");
    } catch (err) {
      console.log(err.message);
    }
  }
}

const tempRegister = (onRegister) => html` <section id="register">
  <article class="narrow">
    <header class="pad-med">
      <h1>Register</h1>
    </header>
    <form @submit=${onRegister} id="register-form" class="main-form pad-large">
      <div class="error" style="display:none">Error message.</div>
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Username: <input type="text" name="username" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <label>Repeat: <input type="password" name="repass" /></label>
      <input class="action cta" type="submit" value="Create Account" />
    </form>
    <footer class="pad-small">
      Already have an account? <a href="/login" class="invert">Sign in here</a>
    </footer>
  </article>
</section>`;
