import {
  html,
  render,
} from "../../../JS-Libraries/node_modules/lit-html/lit-html.js";
import { classMap } from "../../../JS-Libraries/node_modules/lit-html/directives/class-map.js";
import { styleMap } from "../../../JS-Libraries/node_modules/lit-html/directives/style-map.js";
import { repeat } from "../../../JS-Libraries/node_modules/lit-html/directives/repeat.js";
import { contacts } from "./contacts.js";

const main = document.getElementById("contacts");

const contactTemplate = (contact) => html` <div class="contact card">
  <div>
    <i class="far fa-user-circle gravatar"></i>
  </div>
  <div class="info">
    <h2>Name: ${contact.name}</h2>
    <button class="detailsBtn" @click=${() => showDetails(contact.id)}>
      Details
    </button>
    <div class="details" id=${contact.id} style="display: none;">
      <p>Phone number: ${contact.phoneNumber}</p>
      <p>Email: ${contact.email}</p>
    </div>
  </div>
</div>`;

function showDetails(id) {
  const details = document.getElementById(id);
  details.style.display = details.style.display == "none" ? "block" : "none";
}

let contactsTemplate = html` ${contacts.map((contact) =>
  contactTemplate(contact)
)}`;

render(contactsTemplate, main);
