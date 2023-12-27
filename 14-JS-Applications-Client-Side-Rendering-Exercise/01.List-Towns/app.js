import { html, render } from "../node_modules/lit-html/lit-html.js";
// judge -> import { html, render } from "../node_modules/lit-html/lit-html.js";

const body = document.querySelector("body");
body.innerHTML = "";

const template = html` <form @submit=${onSubmit} action="#" class="content">
    <label for="towns">Towns</label>
    <input id="towns" name="towns" type="text" />
    <button id="btnLoadTowns">Load</button>
  </form>
  <div id="root"></div>`;

function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const towns = formData.get("towns").split(",");
  const root = document.getElementById("root");
  render(templateRoot(towns), root);
}

const templateRoot = (towns) =>
  html`<ul>
    ${towns.map((town) => html`<li>${town}</li>`)}
  </ul>`;

render(template, body);
