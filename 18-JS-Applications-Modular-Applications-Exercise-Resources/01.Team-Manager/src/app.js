import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { showBrowse } from "./views/browse.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showNav } from "./views/nav.js";

page(decorateContext);
page(session);
page(showNav);

page("/", showHome);
page("/browse", showBrowse);
page("/login", showLogin);
page.start();

function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, document.querySelector("main"));
  next();
}

function session(ctx, next) {
  //ctx.user = "user";
  next();
}
