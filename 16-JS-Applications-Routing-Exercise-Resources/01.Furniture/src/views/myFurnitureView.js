import { render } from "../../node_modules/lit-html/lit-html.js";
import { getCatalogByOwnerRequest } from "../services/reqests.js";
import { templateCatalog } from "../templates/templateCatalog.js";

export async function myFurnitureView() {
  const container = document.querySelector(".container");
  const furnitures = await getCatalogByOwnerRequest();
  const template = templateCatalog(furnitures);
  render(template, container);
}
