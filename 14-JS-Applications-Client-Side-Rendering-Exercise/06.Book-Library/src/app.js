console.log("My requests...");
import { render } from "../node_modules/lit-html/lit-html.js";
import { getAllBooks, deleteBook, addBook } from "./requests.js";
import {
  templateBody,
  templatLoadBooks,
  templateAddBook,
  templateBookRow,
  templateEditBook,
} from "./templates.js";

let books = {};
const body = document.querySelector("body");
render(templateBody, body);
let table = body.querySelector("tbody");
let form = body.querySelector("form");
render(templateAddBook, form);

document.addEventListener("submit", await onSubmit);
document.addEventListener("click", await onClick);

async function onSubmit(e) {
  e.preventDefault();
  if (e.target.tagName == "FORM") {
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const book = await addBook(title, author);
    if (book) {
      const { _id, title, author } = book;
      const tr = document.createElement("tr");
      tr.id = _id;
      render(templateBookRow(title, author), tr);
      table.appendChild(tr);
      if (!books.hasOwnProperty(_id)) {
        book[_id] = {};
      }
      books[_id] = { title, author };
      form.reset();
    }
  }
}

async function onClick(e) {
  if (e.target.tagName === "BUTTON") {
    const button = e.target.textContent;
    if (button === "LOAD ALL BOOKS") {
      books = await getAllBooks();
      render(templatLoadBooks(books), table);
    } else if (button === "Delete") {
      const tr = e.target.parentNode.parentNode;
      const bookId = tr.id;
      const result = await deleteBook(bookId);
      if (result) {
        tr.remove();
        delete books[bookId];
      }
    }

    console.log(e.target.tagName);
  }
}
