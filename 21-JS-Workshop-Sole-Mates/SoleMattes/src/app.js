import { LitElement, html } from "lit";
import page from "../node_modules/page/page.mjs";

import "./components/nav/nav.js";
import "./components/footer/footer.js";
import "./components/home/home.js";

import { AuthService } from "./services/AuthService.js";
import { BaseCrudApiService } from "./services/BaseCrudApiService.js";
import { SessionService } from "./services/SessionService.js";

const baseUrl = "http://localhost:3030";
const pathShoes = "/data/shoes";

//Router
const router = {
  navigate: page.show,
  redirect: page.redirect,
};

//Services
const sessionService = new SessionService();
const authService = new AuthService(baseUrl, sessionService);
const shoesService = new BaseCrudApiService(baseUrl, pathShoes, sessionService);

class MainApp extends LitElement {
  static properties = {
    currentComponent: { type: Object },
  };

  constructor() {
    super();
    this.currentComponent = undefined;
    this.showHomePage = this._showHomePage.bind(this);
  }

  _showHomePage() {
    this.currentComponent = html`<home-component></home-component>`;
  }

  render() {
    return html`
      <div id="wrapper">
        <header>
          <nav-component
            .authService=${authService}
            .router=${router}
          ></nav-component>
        </header>
        <main>${this.currentComponent}</main>
      </div>
      <footer-component></footer-component>
    `;
  }
}
customElements.define("main-app", MainApp);

let mainApp = document.querySelector('head');

//Routing
page("/index.html", "/");
//page(navComponent.showView);
//page("/", mainApp.showHomePage);
//page("/login", loginComponent.showView);
// page("/register", registerComponent.showView);
// page("/dashboard", dashboardComponent.showView);
// page("/create", createComponent.showView);
// page("/details/:id", detailComponent.showView);
// page("/edit/:id", editComponent.showView);
// page("/search", searchComponent.showView);
page.start();
