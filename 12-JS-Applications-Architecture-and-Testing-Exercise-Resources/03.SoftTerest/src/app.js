import {
  isUser,
  setUser,
  getAccessToken,
  removeUser,
  getUser,
} from "./services/authoriaztion.js";
import { catalogPage } from "./view/catalog.js";
import { createPage } from "./view/create.js";
import { homePage } from "./view/home.js";
import { loginPage } from "./view/login.js";
import { logout } from "./view/logout.js";
import { registerPage } from "./view/register.js";
import {
  loginUser,
  registerUser,
  logoutRequest,
  getIdeas,
  getIdeaById,
  deleteIdeaById,
  createIdea,
} from "./services/request.js";
import { detailsPage } from "./view/details.js";

document.getElementById("view").remove();
const root = document.getElementById("root");

const route = {
  "/": () => homePage(showSection),
  "/catalog": () =>
    catalogPage(
      showSection,
      getIdeas,
      detailsPage,
      getIdeaById,
      goTo,
      getUser,
      deleteIdeaById
    ),
  "/create": () => createPage(showSection, createIdea, getAccessToken, goTo),
  "/logout": () =>
    logout(logoutRequest, getAccessToken, removeUser, updateNav, goTo),
  "/login": () => loginPage(showSection, loginUser, setUser, updateNav, goTo),
  "/register": () =>
    registerPage(showSection, registerUser, setUser, updateNav, goTo),
};

const context = {
  showSection,
  updateNav,
  goTo,
  loginUser,
  setUser,
  logoutRequest,
  getAccessToken,
  removeUser,
};

const navElem = document.querySelector("nav");
navElem.addEventListener("click", onNavigate);

function onNavigate(e) {
  if (e.target.tagName === "A" && e.target.href) {
    e.preventDefault();
    const path = new URL(e.target.href).pathname;
    goTo(path);
  } else {
    //homePage(showSection);
  }
}

function goTo(path, ...params) {
  const view = route[path];
  if (typeof view === "function") {
    view(...params);
  }
}

function updateNav() {
  navElem
    .querySelectorAll(".user")
    .forEach((el) => (el.style.display = isUser() ? "inline-block" : "none"));
  navElem
    .querySelectorAll(".guest")
    .forEach((el) => (el.style.display = !isUser() ? "inline-block" : "none"));
}

function showSection(section) {
  root.replaceChildren(section);
}

updateNav(navElem, isUser);
homePage(showSection);
removeUser();
