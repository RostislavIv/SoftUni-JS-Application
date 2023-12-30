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

document.getElementById("logoutBtn").addEventListener("click", logout);
updateNav();

page("/index.html", "/");
page("/", catalogView);
page("/details/:id", detailsView);
page("/login", loginView);
page("/register", registerView);
page("/create", createView);
page("/edit/:id", editView);
page("/myFurniture", myFurnitureView);
page.start();
