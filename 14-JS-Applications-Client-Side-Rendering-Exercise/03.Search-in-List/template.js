import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";
export { templateBody };

const templateBody = (body, match) => html` <article>
  <div id="towns">${templateTowns(towns, match)}</div>
  <input type="text" id="searchText" />
  <button @click=${() => onSearch(body)}>Search</button>
  <div id="result">${countMatches(towns, match)} matches found</div>
</article>`;

const templateTowns = (towns, match) =>
  html`<ul>
    ${towns.map((town) => templateTown(town, match))}
  </ul>`;

const templateTown = (town, match) =>
  html`<li class=${isMatch(town, match) ? "active" : ""}>${town}</li>`;

function countMatches(towns, match) {
  const count = towns.filter((t) => isMatch(t, match)).length;
  return count;
}

function isMatch(text, searchText) {
  let pattern = new RegExp(`^${searchText}`);
  return pattern.test(text) && searchText;
  //return text.includes(searchText) && searchText;
}

function onSearch(body) {
  const match = body.querySelector("#searchText").value;
  render(templateBody(body, match), body);
}
