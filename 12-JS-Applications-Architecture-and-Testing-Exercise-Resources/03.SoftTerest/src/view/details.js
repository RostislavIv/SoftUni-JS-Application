const detailDiv = document.getElementById("detailsPage");
detailDiv.innerHTML = "";

export async function detailsPage(
  id,
  showSection,
  getIdeaById,
  goTo,
  getUser,
  deleteIdeaById
) {
  const { _ownerId, img, title, description } = await getIdeaById(id);
  detailDiv.innerHTML = `        
        <img class="det-img" src=${img} />
        <div class="desc">
          <h2 class="display-5">${title}</h2>
          <p class="infoType">Description:</p>
          <p class="idea-description">${description}</p>
        </div>`;

  const { userId, accessToken } = getUser();
  const isOwner = userId === _ownerId;
  if (isOwner) {
    detailDiv.innerHTML += `
            <div class="text-center">
          <a class="btn detb" href="">Delete</a>
        </div>`;
    detailDiv.querySelector("a").addEventListener("click", async (e) => {
      e.preventDefault();
      const result = await deleteIdeaById(id, accessToken);
      goTo("/catalog");
    });
  }

  showSection(detailDiv);
}
