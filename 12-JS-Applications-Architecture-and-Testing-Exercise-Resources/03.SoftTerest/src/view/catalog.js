const catalogDiv = document.getElementById("dashboard-holder");
catalogDiv.innerHTML = "";

export async function catalogPage(
  showSection,
  getIdeas,
  detailsPage,
  getIdeaById,
  goTo,
  getUser,
  deleteIdeaById
) {
  const ideas = await getIdeas();
  const fragment = document.createDocumentFragment();
  if (ideas.length === 0) {
    catalogDiv.innerHTML = "<h1>No ideas yet! Be the first one :)</h1>";
  } else {
    ideas.forEach((idea) => {
      const { img, title, _id } = idea;
      const div = document.createElement("div");
      div.className = "card overflow-hidden current-card details";
      div.style.width = "20rem";
      div.style.height = "18rem";
      div.innerHTML = `
    <div class="card-body">
    <p class="card-text">${title}</p>
    </div>
    <img
    class="card-image"
    src=${img}
    alt="Card image cap"
    />
    <a class="btn" href="/details">Details</a>
    </div>`;
      div.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        detailsPage(
          _id,
          showSection,
          getIdeaById,
          goTo,
          getUser,
          deleteIdeaById
        );
      });
      fragment.appendChild(div);
    });
    catalogDiv.replaceChildren(fragment);
  }
  showSection(catalogDiv);
}
