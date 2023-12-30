import { render } from "../../node_modules/lit-html/lit-html.js";
import { createItemRequest } from "../services/reqests.js";
import { templateCreate } from "../templates/templateCreate.js";
import page from "../../node_modules/page/page.mjs";

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

function isValid(furneture) {
  const valdidations = {
    make: (v) => v.length >= 4,
    model: (v) => v.length >= 4,
    year: (v) => !isNaN(v) && 1950 <= Number(v) && Number(v) <= 2050,
    description: (v) => v.length > 10,
    price: (v) => !isNaN(v) && Number(v) > 0,
    img: (v) => v !== "",
    material: (v) => true,
  };

  let isValidAllField = true;
  Object.entries(furneture).forEach(([key, value]) => {
    if (valdidations[key]) {
      const isValidField = valdidations[key](value);
      if (!isValidField) {
        isValidAllField = false;
      }
      applayClass(key, isValidField);
    }
  });
  return isValidAllField;
}

function applayClass(input, isValid) {
  const inputElem = document.querySelector(`[name=${input}]`);
  inputElem.classList.remove("is-valid", "is-invalid");
  inputElem.classList.add(isValid ? "is-valid" : "is-invalid");
}
