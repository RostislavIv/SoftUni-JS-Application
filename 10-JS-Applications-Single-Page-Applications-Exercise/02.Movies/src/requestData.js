export async function requestLogin(email, password) {
  const url = "http://localhost:3030/users/login";
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  try {
    var responce = await fetch(url, settings);
    if (responce.status != 200) {
      throw new Error(responce.statusText);
    }
    const user = await responce.json();
    return user;
  } catch (err) {
    alert(err.message);
  }
}

export async function requestRegister(email, password) {
  const url = "http://localhost:3030/users/register";
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  try {
    var responce = await fetch(url, settings);
    if (responce.status != 200) {
      throw new Error(responce.statusText);
    }
    const user = await responce.json();
    return user;
  } catch (err) {
    alert(err.message);
  }
}

export async function requestGetMovies() {
  const url = "http://localhost:3030/data/movies";
  try {
    const responce = await fetch(url);
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const result = await responce.json();
    return result;
  } catch (err) {
    alert(err.message);
  }
}

export async function requestLogout() {
  const url = "http://localhost:3030/users/logout";
  const settings = {
    method: "GET",
    headers: { "X-Authorization": sessionStorage.getItem("accessToken") },
  };
  try {
    const response = await fetch(url, settings);
    if (response.status != 204) {
      throw new Error(response.statusText);
    }
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");
  } catch (err) {
    alert(err.message);
  }
}

export async function requestAddMovie(title, description, img) {
  const movie = { title, description, img, likes: 2 };
  const url = "http://localhost:3030/data/movies";
  const settings = {
    method: "POST",
    headers: {
      "X-Authorization": sessionStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  };
  try {
    const responce = await fetch(url, settings);
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const movie = await responce.json();
    return movie;
  } catch (err) {
    alert(err.message);
  }
}

export async function requestGetMovie(id) {
  const url = `http://localhost:3030/data/movies/${id}`;
  try {
    const responce = await fetch(url);
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const movie = await responce.json();
    return movie;
  } catch (err) {
    alert(err.message);
  }
}

export async function requestDeleteMovie(id) {
  const url = `http://localhost:3030/data/movies/${id}`;
  const settings = {
    method: "DELETE",
    headers: { "X-Authorization": sessionStorage.getItem("accessToken") },
  };
  await fetch(url, settings);
}

export async function requestEditMovie(movie, id) {
  const url = `http://localhost:3030/data/movies/${id}`;
  const settings = {
    method: "PUT",
    headers: {
      "X-Authorization": sessionStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  };
  try {
    const responce = await fetch(url, settings);
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const movie = await responce.json();
    return movie;
  } catch (err) {
    alert(err.message);
  }
}

export async function requestLikeMovie(id) {
  const url = "http://localhost:3030/data/likes";
  const settings = {
    method: "POST",
    headers: {
      "X-Authorization": sessionStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId: id }),
  };
  try {
    const responce = await fetch(url, settings);
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const result = await responce.json();
    return result;
  } catch (err) {
    alert(err.message);
  }
}
