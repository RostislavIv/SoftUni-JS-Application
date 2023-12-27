import { onDelete } from "./delete.js";
import { showEdit } from "./edit.js";
import { onLike } from "./like.js";
import { requestGetMovie } from "./requestData.js";
import { removeSections } from "./units.js";

let container;
let sections;
let detailSection;
let titleElem;
let imgElem;
let descriptionElem;
let deleteElem;
let editElem;
let likeElem;

export function setupDetails(containerElem, sectionElems) {
  container = containerElem;
  sections = sectionElems;
  detailSection = sectionElems.details;
  titleElem = detailSection.querySelector("h1");
  imgElem = detailSection.querySelector("img");
  descriptionElem = detailSection.querySelector("p");
  [deleteElem, editElem, likeElem] = detailSection.querySelectorAll("a");
}

export async function showDetails(id) {
  const movie = await requestGetMovie(id);
  titleElem.textContent = movie.title;
  imgElem.src = movie.img;
  descriptionElem.textContent = movie.description;
  const isQwner = movie._ownerId === sessionStorage.getItem("userId");
  if (isQwner) {
    deleteElem.addEventListener("click", (e) => {
      e.preventDefault();
      onDelete(id);
    });
    editElem.addEventListener("click", (e) => {
      e.preventDefault();
      showEdit(movie);
    });
  } else {
    likeElem.addEventListener("click", (e) => {
      e.preventDefault();
      onLike(movie);
    });
  }

  deleteElem.style.display = isQwner ? "inline-block" : "none";
  editElem.style.display = isQwner ? "inline-block" : "none";
  likeElem.style.display = isQwner ? "none" : "inline-block";
  removeSections(sections);
  container.appendChild(detailSection);
}
