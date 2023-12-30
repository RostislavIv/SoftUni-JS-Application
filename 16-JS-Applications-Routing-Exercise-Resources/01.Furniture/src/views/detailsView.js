import { render } from "../../node_modules/lit-html/lit-html.js";
import { getItemRequest } from "../services/reqests.js";
import { getUser } from "../services/authorization.js";
import { templateDetails } from "../templates/templateDetails.js";

export async function detailsView(context) {
  const container = document.querySelector(".container");
  const idFurneture = context.params.id;
  const furniture = await getItemRequest(idFurneture);
  const user = getUser();
  const isFurnetureOwner = user._id === furniture._ownerId;
  const template = templateDetails(furniture, isFurnetureOwner);
  render(template, container);
}
