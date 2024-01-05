import { LitElement, html } from "lit";
import page from "../node_modules/page/page.mjs";

import { AuthService } from "./services/AuthService.js";
import { BaseCrudApiService } from "./services/BaseCrudApiService.js";
import { SessionService } from "./services/SessionService.js";

// import { render } from "../node_modules/lit-html/lit-html.js";
// import { HomeComponent } from "./components/home/home.js";
// import { homeTemplate } from "./components/home/homeTemplate.js";
// import { LoginComponent } from "./components/login/login.js";
// import { loginTemplate } from "./components/login/loginTemplate.js";
// import { NavComponent } from "./components/nav/nav.js";
// import { navTemplate } from "./components/nav/navTemplate.js";
// import { RegisterComponent } from "./components/register/register.js";
// import { registerTemplate } from "./components/register/registerTemplate.js";
// import { DashboardComponent } from "./components/dashboard/dashboard.js";
// import { dashboardTemplate } from "./components/dashboard/dashboardTemplate.js";
// import { CreateComponent } from "./components/create/create.js";
// import { createTemplate } from "./components/create/createTemplate.js";
// import { DetailsComponent } from "./components/details/details.js";
// import { detailsTemplate } from "./components/details/detailsTemplate.js";
// import { EditComponent } from "./components/edit/edit.js";
// import { editTemplate } from "./components/edit/editTemplate.js";
// import { SearchComponent } from "./components/search/search.js";
// import { searchTemplate } from "./components/search/searchTemplate.js";

// const main = document.querySelector("main");
// const nav = document.querySelector("header");

const baseUrl = "http://localhost:3030";
const pathShoes = "/data/shoes";

//Router
const router = {
  navigate: page.show,
  redirect: page.redirect,
};

//Render handlers
// const renderBody = (template) => render(template, main);
// const renderNav = (template) => render(template, nav);

//Services
const sessionService = new SessionService();
const authService = new AuthService(baseUrl, sessionService);
const shoesService = new BaseCrudApiService(baseUrl, pathShoes, sessionService);

//Components
// const navComponent = new NavComponent(
//   authService,
//   renderNav,
//   navTemplate,
//   router
// );
// const homeComponent = new HomeComponent(renderBody, homeTemplate);
// const loginComponent = new LoginComponent(
//   authService,
//   renderBody,
//   loginTemplate,
//   router
// );
// const registerComponent = new RegisterComponent(
//   authService,
//   renderBody,
//   registerTemplate,
//   router
// );
// const dashboardComponent = new DashboardComponent(
//   shoesService,
//   renderBody,
//   dashboardTemplate
// );
// const createComponent = new CreateComponent(
//   shoesService,
//   renderBody,
//   createTemplate,
//   router
// );
// const detailComponent = new DetailsComponent(
//   shoesService,
//   renderBody,
//   detailsTemplate,
//   router
// );
// const editComponent = new EditComponent(
//   shoesService,
//   renderBody,
//   editTemplate,
//   router
// );
// const searchComponent = new SearchComponent(
//   shoesService,
//   renderBody,
//   searchTemplate,
//   router
// );

//Routing
page("/index.html", "/");
//page(navComponent.showView);
//page("/", homeComponent.showView);
//page("/login", loginComponent.showView);
// page("/register", registerComponent.showView);
// page("/dashboard", dashboardComponent.showView);
// page("/create", createComponent.showView);
// page("/details/:id", detailComponent.showView);
// page("/edit/:id", editComponent.showView);
// page("/search", searchComponent.showView);
page.start();

class MainApp extends LitElement {
  render() {
    return html` <div id="wrapper">
        <header></header>
        <main></main>
      </div>
      <footer>
        <p>@SoleMates</p>
      </footer>`;
  }
}
customElements.define("main-app", MainApp);
