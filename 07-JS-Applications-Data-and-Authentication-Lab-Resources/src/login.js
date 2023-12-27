import { requestServer } from "./accessServer.js";
import { catalog } from "./catalog.js";

export function login(main, buttons) {
  main.innerHTML = `      
      <article>
        <h2>Login</h2>
        <form>
          <label>E-mail: <input type="text" name="email" /></label>
          <label>Password: <input type="password" name="password" /></label>
          <input type="submit" value="Login" />
        </form>
      </article>`;
  let form = main.querySelector("form");
  form.addEventListener("submit", onLogin);

  async function onLogin(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let email = formData.get("email");
    let password = formData.get("password");
    if (!email || !password) {
      return;
    }
    var url = "http://localhost:3030/users/login";
    var settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    let result = await requestServer(url, settings);
    if (!result.accessToken) {
      return;
    }
    sessionStorage.setItem("accessToken", result.accessToken);
    sessionStorage.setItem("userId", result._id);
    catalog(main, buttons);
  }
}
