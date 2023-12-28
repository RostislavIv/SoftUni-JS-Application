console.log("My requests...");
import { render } from "../node_modules/lit-html/lit-html.js";
import { getAllBooks, deleteBook, addBook, editBook } from "./requests.js";
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

const router = {
  "LOAD ALL BOOKS": () => load(),
  Delete: (e) => del(e),
  Edit: (e) => edit(e),
  "Add book": (title, author) => addForm(title, author),
  "Edit book": (title, author, id) => editForm(title, author, id),
};

document.addEventListener("submit", await onSubmit);
document.addEventListener("click", await onClick);

async function onSubmit(e) {
  e.preventDefault();
  if (e.target.tagName == "FORM") {
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const id = formData.get("id");
    if (!title || !author) {
      return;
    }

    const formType = form.querySelector("h3").textContent;
    const command = router[formType];
    if (typeof command === "function") {
      await command(title, author, id);
    }
  }
}

async function onClick(e) {
  if (e.target.tagName === "BUTTON") {
    const button = e.target.textContent;
    const command = router[button];
    if (typeof command === "function") {
      await command(e);
    }
  }
}

async function load() {
  books = await getAllBooks();
  render(templatLoadBooks(books), table);
  render(templateAddBook, form);
}

async function del(e) {
  const tr = e.target.parentNode.parentNode;
  const bookId = tr.id;
  const result = await deleteBook(bookId);
  if (result) {
    tr.remove();
    delete books[bookId];
  }
}

async function edit(e) {
  const id = e.target.parentNode.parentNode.id;
  const book = books[id];
  render(templateEditBook(id, book), form);
}

async function addForm(title, author) {
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

async function editForm(title, author, id) {
  let book = books[id];
  if (title === book.title && author === book.author) {
    return;
  }
  const resultBook = await editBook(id, { title, author });
  if (resultBook) {
    const tr = table.querySelector(`#${id}`);
    tr.children[0].textContent = title;
    tr.children[1].textContent = author;
    books[id] = { title, author };
    render(templateAddBook, form);
  }
}
