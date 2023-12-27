import { showHome } from "./home.js";
import { requestEditMovie, requestGetMovie } from "./requestData.js";
import { removeSections } from "./units.js";

let container;
let sections;
let editSection;
let form;
let titleElem;
let descriptionElem;
let imgElem;

export function setupEdit(containerElem, sectionElems) {
  container = containerElem;
  sections = sectionElems;
  editSection = sections.edit;
  titleElem = editSection.querySelector("#title");
  descriptionElem = editSection.querySelector("textarea");
  imgElem = editSection.querySelector("#imageUrl");
  form = editSection.querySelector("form");
}

export async function showEdit(movie) {
  removeSections(sections);
  container.appendChild(sections.edit);
  titleElem.value = movie.title;
  descriptionElem.value = movie.description;
  imgElem.value = movie.img;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit(movie);
  });
}

async function onSubmit(movie) {
  const formData = new FormData(form);
  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("img");
  if (
    title != movie.title ||
    description != movie.description ||
    img != movie.img
  ) {
    const editedMovie = { title, description, img };
    const result = await requestEditMovie(editedMovie, movie._id);
  }
  showHome();
}
