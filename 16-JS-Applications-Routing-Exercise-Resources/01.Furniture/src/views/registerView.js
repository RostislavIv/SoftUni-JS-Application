import { registerRequest } from "../services/reqests.js";
import { updateNav } from "../utils.js";
import page from "../../node_modules/page/page.mjs";
import { render } from "../../node_modules/lit-html/lit-html.js";
import { templateRegister } from "../templates/templateRegister.js";

export async function registerView() {
  const container = document.querySelector(".container");
  const template = templateRegister(onSubmit);
  render(template, container);
}

async function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  const rePass = formData.get("rePass");
  if (!email || !password || password != rePass) {
    return;
  }
  const user = await registerRequest(email, password);
  if (!user) {
    return;
  }
  updateNav();
  page.redirect("/");
}
