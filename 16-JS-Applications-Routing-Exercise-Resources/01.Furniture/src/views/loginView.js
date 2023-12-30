import { loginRequest } from "../services/reqests.js";
import { updateNav } from "../utils.js";
import page from "../../node_modules/page/page.mjs";
import { render } from "../../node_modules/lit-html/lit-html.js";
import { templateLogin } from "../templates/templateLogin.js";

export async function loginView() {
  const container = document.querySelector(".container");
  const template = templateLogin(onSubmit);
  render(template, container);
}

async function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    return;
  }
  const user = await loginRequest(email, password);
  if (!user) {
    return;
  }
  updateNav();
  page.redirect("/");
}
