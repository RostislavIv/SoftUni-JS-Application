import { showHome } from "./home.js";
import { requestAddMovie } from "./requestData.js";
import { removeSections } from "./units.js";

let container;
let sections;
let addSection;
let form;

export function setupAdd(containerElem, sectionElems) {
  container = containerElem;
  sections = sectionElems;
  addSection = sectionElems.add;
  form = addSection.querySelector("form");
  form.addEventListener("submit", onSubmit);
}

export function showAdd() {
  removeSections(sections);
  form.reset();
  container.appendChild(addSection);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("img");
  if (!title || !description || !img) {
    return;
  }
  const movie = await requestAddMovie(title, description, img);
  showHome();
}
