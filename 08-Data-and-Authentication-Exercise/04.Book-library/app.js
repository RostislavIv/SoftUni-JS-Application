const url = "http://localhost:3030/jsonstore/collections/books";
window.addEventListener("load", loadAllBooks);
const form = document.querySelector("form");
form.addEventListener("submit", createBook);
bookRows = document.querySelector("body > table > tbody");
const loadBooksBtn = document.getElementById("loadBooks");
loadBooksBtn.addEventListener("click", loadAllBooks);

async function loadAllBooks() {
  try {
    var responce = await fetch(url);
    if (responce.status != 200) {
      throw new Error(responce.status);
    }
    var result = await responce.json();
    var books = Object.entries(result);
    bookRows.innerHTML = "";
    books.forEach((book) => displayBook(book));
  } catch (err) {
    console.error(err.message);
  }
}

function displayBook(book) {
  var id = book[0];
  var title = book[1].title;
  var author = book[1].author;
  var tr = document.createElement("tr");
  tr.innerHTML = `
          <td>${title}</td>
          <td>${author}</td>
          <td>
          <button>Edit</button>
          <button>Delete</button>
          </td>
          `;
  tr.id = id;
  tr.children[2].children[0].addEventListener("click", editBook);
  tr.children[2].children[1].addEventListener("click", deleteBook);
  bookRows.appendChild(tr);

  async function editBook(e) {
    var book = e.target.parentNode.parentNode;
    var id = book.id;
    var h3 = form.querySelector("h3");
    var button = form.querySelector("button");
    var title = form.querySelector('[name="title"]');
    var author = form.querySelector('[name="author"]');
    h3.textContent = "Edit FORM";
    button.textContent = "Save";
    button.id = id;
    title.value = book.children[0].textContent;
    author.value = book.children[1].textContent;
    form.removeEventListener("submit", createBook);
    form.addEventListener("submit", saveChanges);

    async function saveChanges() {
      var body = JSON.stringify({ title: title.value, author: author.value });
      var settings = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body,
      };
      try {
        var responce = await fetch(`${url}/${id}`, settings);
        if (responce.status != 200) {
          throw new Error(responce.statusText);
        }
        form.reset();
        h3.textContent = "FORM";
        button.textContent = "Submit";
        form.removeEventListener("submit", saveChanges);
        form.addEventListener("submit", createBook);
        loadAllBooks();
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function deleteBook(e) {
    var book = e.target.parentNode.parentNode;
    var id = book.id;
    try {
      var responce = await fetch(`${url}/${id}`, { method: "DELETE" });
      if (responce.status != 200) {
        throw new Error(responce.statusText);
      }
      book.remove();
    } catch (err) {
      console.error(err.message);
    }
  }
}

async function createBook(e) {
  e.preventDefault();
  var data = new FormData(e.target);
  var title = data.get("title");
  var author = data.get("author");
  if (title == "" || author == "") {
    return;
  }

  var body = JSON.stringify({ author: author, title: title });
  var settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  };
  try {
    var responce = await fetch(url, settings);
    var result = await responce.json();
    if (responce.status != 200) {
      throw new Error(responce.status);
    }
    var book = [result._id, { title: result.title, author: result.author }];
    displayBook(book);
    form.reset();
  } catch (err) {
    console.error(err.message);
  }
}
