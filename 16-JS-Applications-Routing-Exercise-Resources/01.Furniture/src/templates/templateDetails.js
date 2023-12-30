import { html } from "../../node_modules/lit-html/lit-html.js";

export const templateDetails = (f, isFurnetureOwner, onDelete) => html` <div
    class="row space-top"
  >
    <div class="col-md-12">
      <h1>Furniture Details</h1>
    </div>
  </div>
  <div class="row space-top">
    <div class="col-md-4">
      <div class="card text-white bg-primary">
        <div class="card-body">
          <img src="../../${f.img}" />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <p>Make: <span>${f.make}</span></p>
      <p>Model: <span>${f.model}</span></p>
      <p>Year: <span>${f.year}</span></p>
      <p>Description: <span>${f.description}</span></p>
      <p>Price: <span>${f.price}</span></p>
      <p>Material: <span>${f.material}</span></p>
      ${isFurnetureOwner ? templateButtons(f._id, onDelete) : null}
    </div>
  </div>`;

const templateButtons = (id, onDelete) => html` <div>
  <a href="/edit/${id}" class="btn btn-info">Edit</a>
  <a href="javascript:void(0)" class="btn btn-red" id=${id} @click=${onDelete}
    >Delete</a
  >
</div>`;
