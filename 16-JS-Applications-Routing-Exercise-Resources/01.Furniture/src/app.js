import page from "../node_modules/page/page.mjs";
import { updateNav } from "./utils.js";
import { catalogView } from "./views/catalogView.js";
import { detailsView } from "./views/detailsView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { logout } from "./logout.js";
import { createView } from "./views/createView.js";
import { editView } from "./views/editView.js";
import { myFurnitureView } from "./views/myFurnitureView.js";
import { render } from "../node_modules/lit-html/lit-html.js";
import { getUser, isUser } from "./services/authorization.js";

document.getElementById("logoutBtn").addEventListener("click", logout);
updateNav();

page("index.html", "/");

page(decorateRender);

page("/", catalogView);
page("/details/:id", detailsView);
page("/login", loginView, updateNav);
page("/register", registerView);
page("/create", createView);
page("/edit/:id", editView);
page("/myFurniture", myFurnitureView);
page.start();

function decorateRender(ctx, next) {
  const containerElem = document.querySelector(".container");
  ctx.render = (template) => render(template, containerElem);
  ctx.updateNav = () => updateNav();
  ctx.user = () => getUser();
  ctx.isUser = () => isUser();
  next();
}
