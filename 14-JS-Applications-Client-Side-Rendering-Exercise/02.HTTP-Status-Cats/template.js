//import { html } from "../../../JS-Libraries/node_modules/lit-html/lit-html.js";
import { html } from "./node_modules/lit-html/lit-html.js";

export { templateCats };

const templateCat = (cat) => html` <li>
  <img
    src="./images/${cat.imageLocation}.jpg"
    width="250"
    height="250"
    alt="Card
  image cap"
  />
  <div class="info">
    <button class="showBtn" @click=${onClick}>Show status code</button>
    <div class="status" style="display: none" id=${cat.id}>
      <h4>Status Code: ${cat.statusCode}</h4>
      <p>${cat.statusMessage}</p>
    </div>
  </div>
</li>`;

function onClick(e) {
  const cat = e.target.parentNode;
  const statusDiv = cat.querySelector(".status");
  const button = cat.querySelector(".showBtn");
  if (statusDiv.style.display == "none") {
    statusDiv.style.display = "block";
    button.textContent = "Hide status code";
  } else {
    statusDiv.style.display = "none";
    button.textContent = "Show status code";
  }
}

const templateCats = (cats) =>
  html`<ul>
    ${cats.map((cat) => templateCat(cat))}
  </ul>`;
