import { render } from "../node_modules/lit-html/lit-html.js";
import { getOption, addOption } from "./requests.js";
import { templateBody } from "./templates.js";

async function showOptions() {
  const body = document.querySelector("body");
  const options = await getOption();
  render(templateBody(options), body);
}

document.addEventListener("submit", await onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  if (e.target.tagName === "FORM") {
    const form = e.target;
    const input = e.target.querySelector("#itemText").value.trim();
    if (input != "") {
      if (await addOption(input)) {
        await showOptions();
        form.reset();
      }
    }
  }
}

await showOptions();
