import { isUser } from "./services/authorization.js";

export function updateNav() {
  const userNav = document.getElementById("user");
  const guestNav = document.getElementById("guest");

  userNav.style.display = isUser() ? "inline-block" : "none";
  guestNav.style.display = !isUser() ? "inline-block" : "none";
}
