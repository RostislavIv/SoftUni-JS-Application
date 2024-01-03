import { html } from "../../../node_modules/lit-html/lit-html.js";

export const searchTemplate = (
  searchHendler,
  searchShoes,
  isLog
) => html` <section id="search">
  <h2>Search by Brand</h2>

  <form @submit=${searchHendler} class="search-wrapper cf">
    <input
      id="#search-input"
      type="text"
      name="search"
      placeholder="Search here..."
      required
    />
    <button type="submit">Search</button>
  </form>

  <h3>Results:</h3>
${!searchShoes ? "" : resultTemplate(searchShoes, isLog)}

  </div>
</section>`;

const resultTemplate = (searchShoes, isLog) => html` <div id="search-container">
  ${searchShoes.length > 0
    ? html`<!-- Display a li with information about every post (if any)-->
        <ul class="card-wrapper">
          ${searchShoes.map((shoe) => shoeTemplate(shoe, isLog))}
        </ul>`
    : html`<h2>There are no results found.</h2>`}
</div>`;

const shoeTemplate = (shoe, isLog) => html` <li class="card">
  <img src=${shoe.imageUrl} alt="travis" />
  <p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
  <p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
  <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
  ${isLog
    ? html`<a class="details-btn" href="/details/${shoe._id}">Details</a>`
    : ""}
</li>`;
