//import { render } from "../../node_modules/lit-html/lit-html.js";
import { deleteItemRequest, getItemRequest } from "../services/reqests.js";
import { getUser } from "../services/authorization.js";
import { templateDetails } from "../templates/templateDetails.js";
//import page from "../../node_modules/page/page.mjs";

export async function detailsView(ctx) {
  //const container = document.querySelector(".container");
  const idFurneture = ctx.params.id;
  const furniture = await getItemRequest(idFurneture);
  const user = getUser();
  const isFurnetureOwner = user._id === furniture._ownerId;
  const template = templateDetails(furniture, isFurnetureOwner, onDelete);
  ctx.render(template);
}

async function onDelete(e) {
  e.preventDefault();
  const id = e.target.id;
  const isDeleted = await deleteItemRequest(id);
  if (!isDeleted) {
    return;
  }
  ctx.page("/");
}
