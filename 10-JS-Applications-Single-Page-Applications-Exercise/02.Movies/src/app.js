import { setupHome, showHome } from "./home.js";
import { setupLogin, showLogin } from "./login.js";
import { logout } from "./logout.js";
import { setupRegister, showRegister } from "./register.js";
import { setupAdd, showAdd } from "./add.js";
import { setupEdit } from "./edit.js";
import { displayNav, removeSections } from "./units.js";
import { setupDetails } from "./details.js";

window.addEventListener("load", onLoad);

function onLoad() {
  const links = {
    "/home": showHome,
    "/logout": logout,
    "/login": showLogin,
    "/register": showRegister,
    "/addMovie": showAdd,
  };

  const container = document.getElementById("container");
  container.addEventListener("click", onNavigation);

  const sections = {
    home: document.getElementById("home-page"),
    add: document.getElementById("add-movie"),
    details: document.getElementById("movie-example"),
    edit: document.getElementById("edit-movie"),
    login: document.getElementById("form-login"),
    register: document.getElementById("form-sign-up"),
  };

  function onNavigation(e) {
    if (e.target.tagName === "A" && e.target.href) {
      e.preventDefault();
      const href = new URL(e.target.href).pathname;
      const view = links[href];
      if (typeof view == "function") {
        view();
      }
    }
  }

  setupHome(container, sections);
  setupAdd(container, sections);
  setupDetails(container, sections);
  setupEdit(container, sections);
  setupLogin(container, sections);
  setupRegister(container, sections);
  removeSections(sections);
  displayNav(container);
  showHome();
}
