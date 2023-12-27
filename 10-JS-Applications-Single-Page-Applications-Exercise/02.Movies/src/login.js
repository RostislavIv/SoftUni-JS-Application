import { showHome } from "./home.js";
import { requestLogin } from "./requestData.js";
import { removeSections } from "./units.js";

let container;
let sections;
let loginSection;
let form;

export function setupLogin(containerElem, sectionElems) {
  container = containerElem;
  sections = sectionElems;
  loginSection = sections.login;
  form = loginSection.querySelector("form");
  form.addEventListener("submit", onSubmit);
}

export function showLogin() {
  removeSections(sections);
  form.reset();
  container.appendChild(loginSection);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  if (!password || !email) {
    return;
  }
  const user = await requestLogin(email, password);
  if (!user) {
    return;
  }
  sessionStorage.setItem("accessToken", user.accessToken);
  sessionStorage.setItem("userId", user._id);
  sessionStorage.setItem("email", user.email);
  showHome();
}
