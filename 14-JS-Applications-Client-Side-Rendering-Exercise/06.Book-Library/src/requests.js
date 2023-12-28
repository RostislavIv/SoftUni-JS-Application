export { getAllBooks, deleteBook, addBook };

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
  //   if (book) {
  //     book = [book._id, { title: book.title, author: book.author }];
  //   }
  return book;
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
