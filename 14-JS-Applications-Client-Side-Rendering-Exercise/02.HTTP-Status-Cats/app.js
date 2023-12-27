import { templateCats } from "./template.js";
import { cats } from "./catSeeder.js";
import { render } from "./node_modules/lit-html/lit-html.js";

const sectionAllCats = document.getElementById("allCats");
render(templateCats(cats), sectionAllCats);
