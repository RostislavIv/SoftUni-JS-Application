import { render } from "./node_modules/lit-html/lit-html.js";
import { templateBody } from "./template.js";

const body = document.querySelector("body");

render(templateBody(body, ""), body);
