import { logoutRequest } from "./services/reqests.js";
import { updateNav } from "./utils.js";
import page from "../node_modules/page/page.mjs";

export async function logout(e) {
  e.preventDefault();
  const isLogout = await logoutRequest();
  if (isLogout) {
    updateNav();
    page.redirect("/");
  }
}
