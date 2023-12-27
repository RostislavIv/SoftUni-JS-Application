import { html } from "../node_modules/lit-html/lit-html.js";
export { templateBody };

const templateBody = (options) => html` <h1>Dropdown Menu</h1>
  <article>
    <div>
      <select id="menu">
        ${options.map((o) => templateOption(o))}
      </select>
    </div>
    <form>
      <label for="itemText"> Text: </label>
      <input type="text" id="itemText" />
      <input type="submit" value="Add" />
    </form>
  </article>`;

const templateOption = (option) =>
  html`<option value=${option._id}>${option.text}</option>`;
