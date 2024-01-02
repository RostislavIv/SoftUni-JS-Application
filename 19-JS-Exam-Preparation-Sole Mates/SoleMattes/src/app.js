import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { HomeComponent } from "./components/home/home.js";
import { homeTemplate } from "./components/home/homeTemplate.js";
import { LoginComponent } from "./components/login/login.js";
import { loginTemplate } from "./components/login/loginTemplate.js";
import { NavComponent } from "./components/nav/nav.js";
import { navTemplate } from "./components/nav/navTemplate.js";
import { AuthService } from "./services/AuthService.js";
import { BaseCrudApiService } from "./services/BaseCrudApiService.js";
import { SessionService } from "./services/SessionService.js";
import { RegisterComponent } from "./components/register/register.js";
import { registerTemplate } from "./components/register/registerTemplate.js";

const main = document.querySelector("main");
const nav = document.querySelector("header");

const baseUrl = "http://localhost:3030";
const pathShoes = "/data/shoes";

//Router
const router = {
  navigate: page.show,
  redirect: page.redirect,
};

//Render hendlers
const renderBody = (template) => render(template, main);
const renderNav = (template) => render(template, nav);

//Services
const sessionService = new SessionService();
const authService = new AuthService(baseUrl, sessionService);
const shoesService = new BaseCrudApiService(baseUrl, pathShoes, sessionService);

//Components
const navComponent = new NavComponent(
  authService,
  renderNav,
  navTemplate,
  router
);
const homeComponent = new HomeComponent(renderBody, homeTemplate);
const loginComponent = new LoginComponent(
  authService,
  renderBody,
  loginTemplate,
  router
);
const registerComponent = new RegisterComponent(
  authService,
  renderBody,
  registerTemplate,
  router
);

//Roting
page("/index.html", "/");
page(navComponent.showView);
page("/", homeComponent.showView);
page("/login", loginComponent.showView);
page("/register", registerComponent.showView);
page.start();
