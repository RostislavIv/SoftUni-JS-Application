import { render } from "../../node_modules/lit-html/lit-html.js";
import { createItemRequest } from "../services/reqests.js";
import { templateCreate } from "../templates/templateCreate.js";
import page from "../../node_modules/page/page.mjs";
import { isValid } from "../utils.js";

export function createView() {
  const container = document.querySelector(".container");
  const template = templateCreate(onSubmit);
  render(template, container);
}

async function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const furneture = Object.fromEntries([...formData.entries()]);

  if (!isValid(furneture)) {
    return;
  }

  const result = await createItemRequest(furneture);
  if (!result) {
    return;
  }
  page.redirect("/");
}
