import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { AuthService } from "./services/authService.js";
import { NavComponent } from "./components/nav/navComponent.js";
import { navTemplate } from "./components/nav/navTemplate.js";
import { WelcomeComponent } from "./components/welcome/welcomeComponent.js";
import { QuizzesService } from "./services/quizzesService.js";
import { welcomeTemplate } from "./components/welcome/welcomeTemplete.js";
import { LoginComponent } from "./components/login/logincomponent.js";
import { loginTemplate } from "./components/login/loginTemplate.js";
import { RegisterComponent } from "./components/register/registerComponent.js";
import { registerTemplate } from "./components/register/registerTemplate.js";
import { createDatabase } from "./createDatabase.js";
import { BrowserComponent } from "./components/browser/browserComponent.js";
import { browserTemplate } from "./components/browser/browsertemplate.js";

//await createDatabase();

//Services
const authService = new AuthService();
const quizzesService = new QuizzesService();

//Renders
const headerElem = document.querySelector("header");
const mainElem = document.querySelector("main");
const headerRender = (template) => render(template, headerElem);
const mainRender = (template) => render(template, mainElem);

//Routers
const router = {
  show: page.show,
  redirect: page.redirect,
};

//Components
const navComponent = new NavComponent(
  authService,
  headerRender,
  navTemplate,
  router
);
const welcomeComponent = new WelcomeComponent(
  quizzesService,
  mainRender,
  welcomeTemplate
);
const browserComponent = new BrowserComponent(
  quizzesService,
  mainRender,
  browserTemplate,
  router
);
const loginComponent = new LoginComponent(
  authService,
  mainRender,
  loginTemplate,
  router
);
const registerComponent = new RegisterComponent(
  authService,
  mainRender,
  registerTemplate,
  router
);

page("/index.html", "/");
page(navComponent.show);
page("/", welcomeComponent.show);
page("/browser", browserComponent.show);
page("/login", loginComponent.show);
page("/register", registerComponent.show);
page.start();

//debugger;
//const quizzes = await quizzesService.getAll();

//await authService.login({ username: "Peter", password: "123456" });
//console.log(authService.isLog());
// await authService.register({
//   username: "Rosti4",
//   email: "rosti4@abv.bg",
//   password: "123456",
//   repass: "123456",
// });
// console.log(authService.isLog());
//
// console.log(authService.isLog());
