export { getAllBooks, deleteBook, addBook, editBook };

const url = "http://localhost:3030/jsonstore/collections/books";

async function getAllBooks() {
  const books = await innerFetch(url, {});
  return books;
}

async function deleteBook(id) {
  const urlDelete = `${url}/${id}`;
  const settings = {
    method: "DELETE",
  };
  const result = innerFetch(urlDelete, settings);
  return result;
}

async function addBook(title, author) {
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author }),
  };
  let book = await innerFetch(url, settings);
  return book;
}

async function editBook(id, { title, author }) {
  const urlEdit = `${url}/${id}`;
  const settings = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author }),
  };
  const result = await innerFetch(urlEdit, settings);
  return result;
}

async function innerFetch(url, settings) {
  try {
    const responce = await fetch(url, settings);
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const data = await responce.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
