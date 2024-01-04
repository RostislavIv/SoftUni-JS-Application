import { html } from "../../../node_modules/lit-html/lit-html.js";

export const detailsTemp = (
  album,
  isLog,
  isOwner,
  deleteHandler
) => html` <!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src=${album.imageUrl} alt="example1" />
      </div>
      <div id="info-wrapper">
        <p>
          <strong>Band:</strong><span id="details-singer">${album.singer}</span>
        </p>
        <p>
          <strong>Album name:</strong
          ><span id="details-album">${album.album}</span>
        </p>
        <p>
          <strong>Release date:</strong
          ><span id="details-release">${album.release}</span>
        </p>
        <p>
          <strong>Label:</strong><span id="details-label">${album.label}</span>
        </p>
        <p>
          <strong>Sales:</strong><span id="details-sales">${album.sales}</span>
        </p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${album.likes}</span></div>
      ${isLog
        ? html` <div id="action-buttons">
            ${isOwner
              ? html`<!--Edit and Delete are only for creator-->
                  <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                  <a
                    href=""
                    id="delete-btn"
                    @click=${() => deleteHandler(album._id)}
                    >Delete</a
                  >`
              : html`<a href="/like/${album._id}" id="like-btn">Like</a>`}
          </div>`
        : ""}
    </div>
  </section>`;
