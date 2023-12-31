//import { render } from "../../node_modules/lit-html/lit-html.js";
import { getCatalogRequest } from "../services/reqests.js";
import { templateCatalog } from "../templates/templateCatalog.js";
//import { templateHeader } from "../templates/templateHeader.js";

export async function catalogView(ctx) {
  // const isUser = ctx.isUser();
  // const templHeader = templateHeader(isUser);
  // ctx.renderHeader(templHeader);
  const furnitures = await getCatalogRequest();
  const template = templateCatalog(furnitures);
  ctx.render(template);
  // const container = document.querySelector(".container");
  // const furnitures = await getCatalogRequest();
  // const template = templateCatalog(furnitures);
  // render(template, container);
}
