const url = "http://localhost:3030/";

export async function loginUser(email, password) {
  const urlLogin = `${url}users/login`;
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  const user = await innerFetch(urlLogin, settings);
  return user;
}

export async function registerUser(email, password) {
  const urlLogin = `${url}users/register`;
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  const user = await innerFetch(urlLogin, settings);
  return user;
}

export async function logoutRequest(accessToken) {
  const urlLogout = `${url}users/logout`;
  const settings = {
    method: "GET",
    headers: { "X-Authorization": accessToken },
  };
  const isLogout = await innerFetch(urlLogout, settings);
  return isLogout;
}

export async function getIdeas(accessToken) {
  const urlGetIdeas = `${url}data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`;
  const settings = {
    method: "GET",
  };
  const ideas = await innerFetch(urlGetIdeas, settings);
  return ideas;
}

export async function getIdeaById(id) {
  const urlDetails = `${url}data/ideas/${id}`;
  const settings = {
    method: "GET",
  };
  const idea = await innerFetch(urlDetails, settings);
  return idea;
}

export async function deleteIdeaById(id, accessToken) {
  const urlDelete = `${url}data/ideas/${id}`;
  const settings = {
    method: "DELETE",
    headers: { "X-Authorization": accessToken },
  };
  const result = await innerFetch(urlDelete, settings);
  return result;
}

export async function createIdea(idea, accessToken) {
  const title = idea.title;
  const description = idea.description;
  const img = idea.img;
  const urlCreateIdea = `${url}data/ideas`;
  const settings = {
    method: "POST",
    headers: { "X-Authorization": accessToken },
    body: JSON.stringify({ title, description, img }),
  };
  const result = await innerFetch(urlCreateIdea, settings);
  return result;
}

async function innerFetch(url, settings) {
  try {
    const responce = await fetch(url, settings);
    if (responce.status == 204) {
      return true;
    }
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const result = await responce.json();
    return result;
  } catch (err) {
    console.log(err.message);
  }
}
