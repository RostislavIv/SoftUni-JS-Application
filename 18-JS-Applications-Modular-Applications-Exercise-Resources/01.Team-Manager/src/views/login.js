import { html } from "../../node_modules/lit-html/lit-html.js";
import { loginRequest } from "../services/requestsAuth.js";
import { validateEmail, validatePassword } from "../utils.js";

export function showLogin(ctx) {
  const template = tempLogin(onLogin);

  ctx.render(template);

  async function onLogin(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries([...formData.entries()]);
    if (!validateEmail(email) || !validatePassword(password)) {
      const div = document.querySelector(".error");
      div.style.display = "block";
      return;
    }
    try {
      await loginRequest(email, password);
      ctx.page.show("/");
    } catch (err) {
      console.log(err.message);
    }
  }
}

const tempLogin = (onSubmit) => html` <section id="login">
  <article class="narrow">
    <header class="pad-med">
      <h1>Login</h1>
    </header>
    <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
      <div class="error" style="display:none">Error message.</div>
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <input class="action cta" type="submit" value="Sign In" />
    </form>
    <footer class="pad-small">
      Don't have an account? <a href="/register" class="invert">Sign up here</a>
    </footer>
  </article>
</section>`;
