import { html } from "../node_modules/lit-html/lit-html.js";
export {
  templateBody,
  templatLoadBooks,
  templateAddBook,
  templateEditBook,
  templatLoadBook,
  templateBookRow,
};

const templateBody = html` <button id="loadBooks">LOAD ALL BOOKS</button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <form></form>`;

const templatLoadBooks = (books) =>
  html`${Object.entries(books).map((book) => templatLoadBook(book))}`;

const templatLoadBook = ([id, { title, author }]) =>
  html` <tr id=${id}>
    ${templateBookRow(title, author)}
  </tr>`;

const templateBookRow = (title, author) => html` <td>${title}</td>
  <td>${author}</td>
  <td>
    <button>Edit</button>
    <button>Delete</button>
  </td>`;

const templateAddBook = html` <h3>Add book</h3>
  <label>TITLE</label>
  <input type="text" name="title" placeholder="Title..." />
  <label>AUTHOR</label>
  <input type="text" name="author" placeholder="Author..." />
  <input type="submit" value="Submit" />`;

const templateEditBook = (b) => html` <input
    type="hidden"
    name="id"
    .value=${b._id}
  />
  <h3>Edit book</h3>
  <label>TITLE</label>
  <input type="text" name="title" placeholder="Title..." .value=${b.title} />
  <label>AUTHOR</label>
  <input type="text" name="author" placeholder="Author..." .value=${b.author} />
  <input type="submit" value="Save" />`;
