import { catalog } from "./catalog.js";
import { create } from "./create.js";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { register } from "./register.js";

let buttons = {
  catalog: document.getElementById("catalogBtn"),
  create: document.getElementById("createBtn"),
  logout: document.getElementById("logoutBtn"),
  login: document.getElementById("loginBtn"),
  register: document.getElementById("registerBtn"),
};
let main = document.querySelector("main");

buttons.catalog.addEventListener("click", () => catalog(main, buttons));
buttons.create.addEventListener("click", () => create(main, buttons));
buttons.logout.addEventListener("click", () => logout(main, buttons));
buttons.login.addEventListener("click", () => login(main, buttons));
buttons.register.addEventListener("click", () => register(main, buttons));

catalog(main, buttons);
