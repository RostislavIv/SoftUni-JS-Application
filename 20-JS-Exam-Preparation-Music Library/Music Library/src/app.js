import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { AlbumService } from "./services/albumsService.js";
import { SessionService } from "./services/sessionService.js";
import { AuthService } from "./services/authService.js";
import { NavComponent } from "./componens/nav/nav.js";
import { navTemp } from "./componens/nav/navTemplate.js";
import { LoginComponent } from "./componens/login/login.js";
import { loginTemp } from "./componens/login/loginTemplate.js";
import { HomeComponent } from "./componens/home/home.js";
import { homeTemp } from "./componens/home/homeTemp.js";
import { DashboardComponent } from "./componens/dashboard/dashboard.js";
import { dashboardTemp } from "./componens/dashboard/dashboardTemp.js";
import { RegisterComponent } from "./componens/register/register.js";
import { registerTemp } from "./componens/register/registerTemp.js";
import { CreateComponent } from "./componens/create/create.js";
import { createTemp } from "./componens/create/createTemp.js";
import { DetailsComponent } from "./componens/details/details.js";
import { detailsTemp } from "./componens/details/detailsTemp.js";
import { editTemp } from "./componens/edit/editTemp.js";
import { EditComponent } from "./componens/edit/edit.js";

//Services
const BaseUrl = "http://localhost:3030";
const PathUsers = `${BaseUrl}/users`;
const PathAlbums = `${BaseUrl}/data/albums`;
const url = {
  login: `${PathUsers}/login`,
  logout: `${PathUsers}/logout`,
  register: `${PathUsers}/register`,
  getAll: `${PathAlbums}?sortBy=_createdOn%20desc`,
  pathAlbums: `${PathAlbums}`,
};
const sessionService = new SessionService();
const authService = new AuthService(url, sessionService);
const albumService = new AlbumService(url, sessionService);

//Renders
const navElem = document.querySelector("header");
const mainElem = document.querySelector("main");
const navRender = (tepmlate) => render(tepmlate, navElem);
const mainRender = (tepmlate) => render(tepmlate, mainElem);

//Routes
const router = {
  show: page.show,
  redirect: page.redirect,
};

//Componenets
const navComponent = new NavComponent(authService, navRender, navTemp, router);
const homeComponent = new HomeComponent(mainRender, homeTemp);
const dashboardComponent = new DashboardComponent(
  albumService,
  mainRender,
  dashboardTemp
);
const detailsComponent = new DetailsComponent(
  albumService,
  mainRender,
  detailsTemp,
  router
);
const loginComponent = new LoginComponent(
  authService,
  mainRender,
  loginTemp,
  router
);
const registerComponent = new RegisterComponent(
  authService,
  mainRender,
  registerTemp,
  router
);
const createComponent = new CreateComponent(
  albumService,
  mainRender,
  createTemp,
  router
);
const editComponent = new EditComponent(
  albumService,
  mainRender,
  editTemp,
  router
);

//Routing
page("/index.html", "/");
page(navComponent.showView);
page("/", homeComponent.showView);
page("/dashboard", dashboardComponent.showView);
page("/details/:id", detailsComponent.showView);
page("/login", loginComponent.showView);
page("/register", registerComponent.showView);
page("/create", createComponent.showView);
page("/edit/:id", editComponent.showView);
page.start();
