import { render } from "../../node_modules/lit-html/lit-html.js";
import { getCatalogRequest } from "../services/reqests.js";
import { templateCatalog } from "../templates/templateCatalog.js";

export async function catalogView() {
  const container = document.querySelector(".container");
  const furnitures = await getCatalogRequest();
  const template = templateCatalog(furnitures);
  render(template, container);
}
