import { showHome } from "./home.js";
import { requestRegister } from "./requestData.js";
import { removeSections } from "./units.js";

let container;
let sections;
let registerSection;
let form;

export function setupRegister(containerElem, sectionElems) {
  container = containerElem;
  sections = sectionElems;
  registerSection = sections.register;
  form = registerSection.querySelector("form");
  form.addEventListener("submit", onSubmit);
}

export function showRegister() {
  removeSections(sections);
  form.reset();
  container.appendChild(registerSection);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatPassword = formData.get("repeatPassword");
  if (!password || !email || password != repeatPassword) {
    return;
  }
  const user = await requestRegister(email, password);
  if (!user) {
    return;
  }
  sessionStorage.setItem("accessToken", user.accessToken);
  sessionStorage.setItem("userId", user._id);
  sessionStorage.setItem("email", user.email);
  showHome();
}
