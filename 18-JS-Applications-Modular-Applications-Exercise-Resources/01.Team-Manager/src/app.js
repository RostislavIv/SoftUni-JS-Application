import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { logout } from "./logout.js";
import { getUser, isUser } from "./services/authorization.js";
import { showBrowse } from "./views/browse.js";
import { shoeDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showNav } from "./views/nav.js";
import { showRegister } from "./views/register.js";

page(session);
page(showNav);
page(decorateContext);

page("/", showHome);
page("/browse", showBrowse);
page("/myTeam/:id", showBrowse);
page("/login", showLogin);
page("/register", showRegister);
page("/logout", logout);
page("/details/:id", shoeDetails);
page("/edit/:id", showEdit);
page.start();

function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, document.querySelector("main"));
  next();
}

function session(ctx, next) {
  isUser() ? (ctx.user = getUser()) : delete ctx.user;
  next();
}
