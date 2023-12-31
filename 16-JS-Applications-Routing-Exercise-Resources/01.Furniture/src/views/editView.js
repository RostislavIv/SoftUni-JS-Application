//import { render } from "../../node_modules/lit-html/lit-html.js";
import { getItemRequest, updateItemRequest } from "../services/reqests.js";
import { templateEdit } from "../templates/templateEdit.js";
import { isValid } from "../utils.js";
//import page from "../../node_modules/page/page.mjs";

export async function editView(ctx) {
  //const container = document.querySelector(".container");
  const id = ctx.params.id;
  const furniture = await getItemRequest(id);
  if (
    !furniture ||
    Object.values(furniture).includes((v) => v === undefined || v === null)
  ) {
    return;
  }
  const template = templateEdit(furniture, onSubmit);
  ctx.render(template);
}

async function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const furneture = Object.fromEntries([...formData.entries()]);

  if (!isValid(furneture)) {
    return;
  }

  const result = await updateItemRequest(form.id, furneture);
  if (!result) {
    return;
  }
  ctx.page("/");
}
