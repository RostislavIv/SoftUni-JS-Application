import { getAccessToken } from "./authorization.js";
import { innerFetch } from "./innerFetch.js";

const urlBase = "http://localhost:3030";

export async function getAllTeams() {
  const url = `${urlBase}/data/teams`;
  const teams = await innerFetch(url, {});
  return teams;
}

export async function getTeam(id) {
  const url = `${urlBase}/data/teams/${id}`;
  const team = await innerFetch(url, {});
  return team;
}

export async function getTeamsByMember(memberId) {
  const url = `${urlBase}/data/members?where=_ownerId%3D%22${memberId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`;
  const teams = await innerFetch(url, {});
  return teams;
}

export async function getAllMembers() {
  const url = `${urlBase}/data/members?where=status%3D%22member%22`;
  const teams = await innerFetch(url, {});
  return teams;
}

export async function getMembers(teamId) {
  const url = `${urlBase}/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`;
  const members = await innerFetch(url, {});
  return members;
}

export async function removeMember(memberId) {
  const url = `${urlBase}/data/members/${memberId}`;
  const accessToken = getAccessToken();
  const settings = {
    method: "DELETE",
    headers: {
      "X-Authorization": accessToken,
    },
  };
  const resultItem = await innerFetch(url, settings);
  return resultItem ? true : false;
}

export async function joinMemeberToTeam(teamId) {
  const url = `${urlBase}/data/members`;
  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }
  const settings = {
    method: "POST",
    headers: {
      "X-Authorization": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamId),
  };
  const resultItem = await innerFetch(url, settings);
  return resultItem;
}

export async function approveMemeberToTeam(memberId) {
  const url = `${urlBase}/data/members/${memberId}`;
  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }
  const settings = {
    method: "PUT",
    headers: {
      "X-Authorization": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "member" }),
  };
  const resultItem = await innerFetch(url, settings);
  return resultItem;
}

export async function updateTeam(id, team) {
  const url = `${urlBase}/data/teams/${id}`;
  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }
  const settings = {
    method: "PUT",
    headers: {
      "X-Authorization": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  };
  const resultItem = await innerFetch(url, settings);
  return resultItem;
}

// export async function getCatalogRequest() {
//   const urlCatalog = `${url}/data/catalog`;
//   const catalog = await innerFetch(urlCatalog, {});
//   return catalog;
// }

// export async function getCatalogByOwnerRequest() {
//   const user = getUser();
//   const urlCatalog = `${url}/data/catalog?where=_ownerId%3D%22${user._id}%22`;
//   const catalog = await innerFetch(urlCatalog, {});
//   return catalog;
// }

// export async function getItemRequest(id) {
//   const urlCatalog = `${url}/data/catalog/${id}`;
//   const item = await innerFetch(urlCatalog, {});
//   return item;
// }

// export async function createItemRequest(item) {
//   const urlCatalog = `${url}/data/catalog`;
//   const accessToken = getAccessToken();
//   if (!accessToken) {
//     return;
//   }
//   const settings = {
//     method: "POST",
//     headers: {
//       "X-Authorization": accessToken,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(item),
//   };
//   const resultItem = await innerFetch(urlCatalog, settings);
//   return resultItem;
// }

// export async function updateItemRequest(id, item) {
//   const urlCatalog = `${url}/data/catalog/${id}`;
//   const accessToken = getAccessToken();
//   if (!accessToken) {
//     return;
//   }
//   const settings = {
//     method: "PUT",
//     headers: {
//       "X-Authorization": accessToken,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(item),
//   };
//   const resultItem = await innerFetch(urlCatalog, settings);
//   return resultItem;
// }

// export async function deleteItemRequest(id) {
//   const urlDelete = `${url}/data/catalog/${id}`;
//   const accessToken = getAccessToken();
//   const settings = {
//     method: "DELETE",
//     headers: {
//       "X-Authorization": accessToken,
//     },
//   };
//   const resultItem = await innerFetch(urlDelete, settings);
//   return resultItem ? true : false;
// }
