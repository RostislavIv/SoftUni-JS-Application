import { catalog } from "./catalog.js";
import { requestServer } from "./accessServer.js";

export function register(main, buttons) {
  main.innerHTML = `      
    <article>
        <h2>Register</h2>
        <form>
          <label>E-mail: <input type="text" name="email" /></label>
          <label>Password: <input type="password" name="password" /></label>
          <label>Repeat: <input type="password" name="rePass" /></label>
          <input type="submit" value="Register" />
        </form>
      </article>`;
  let form = main.querySelector("form");
  form.addEventListener("submit", onRegister);

  async function onRegister(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("rePass");
    if (!email || !password || rePass != password) {
      return;
    }
    var url = "http://localhost:3030/users/register";
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
