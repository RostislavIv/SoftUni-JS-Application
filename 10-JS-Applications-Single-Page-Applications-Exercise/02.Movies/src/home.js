import { showDetails } from "./details.js";
import { requestGetMovies } from "./requestData.js";
import { displayNav, removeSections } from "./units.js";

let container;
let sections;
let homeSection;

export function setupHome(containerElem, sectionElems) {
  container = containerElem;
  sections = sectionElems;
  homeSection = sectionElems.home;
}

export async function showHome() {
  removeSections(sections);
  container.appendChild(homeSection);
  const movies = await requestGetMovies();
  displayMovies(homeSection, movies);
  displayNav(container);
}

function displayMovies(home, movies) {
  const list = home.querySelector("#movies-list");
  const fragment = document.createDocumentFragment();
  movies.forEach((movie) => {
    const { _ownerId, title, description, img, _id } = movie;
    const li = document.createElement("li");
    li.innerHTML = `
    <li class="card mb-4">
    <img class="card-img-top" src=${img} alt="Card image cap" width="400">
    <div class="card-body">
    <h4 class="card-title">${title}</h4>
    </div>
    <div class="card-footer">
    <a href=#/details/${_id}>
    <button data-id=${_id} class="btn btn-info">Details</button>
    </a>
    </div>
    </li>`;
    fragment.appendChild(li);
    li.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault();
      showDetails(_id);
    });
  });
  list.innerHTML = "";
  list.appendChild(fragment);
}
