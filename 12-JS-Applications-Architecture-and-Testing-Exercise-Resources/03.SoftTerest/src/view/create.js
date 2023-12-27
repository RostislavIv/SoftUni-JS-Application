const createDiv = document.getElementById("createPage");
createDiv.innerHTML = "";

export function createPage(showSection, createIdea, getAccessToken, goTo) {
  createDiv.innerHTML = `
        <div class="d-md-flex flex-mb-equal">
          <div class="col-md-6">
            <img
              class="responsive-ideas create"
              src="./images/creativity_painted_face.jpg"
              alt=""
            />
          </div>
          <form class="form-idea col-md-5" action="#/create" method="post">
            <div class="text-center mb-4">
              <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
            </div>
            <div class="form-label-group">
              <label for="ideaTitle">Title</label>
              <input
                type="text"
                id="ideaTitle"
                name="title"
                class="form-control"
                placeholder="What is your idea?"
                required=""
                autofocus=""
              />
            </div>
            <div class="form-label-group">
              <label for="ideaDescription">Description</label>
              <textarea
                type="text"
                name="description"
                class="form-control"
                placeholder="Description"
                required=""
              ></textarea>
            </div>
            <div class="form-label-group">
              <label for="inputURL">Add Image</label>
              <input
                type="text"
                id="inputURL"
                name="imageURL"
                class="form-control"
                placeholder="Image URL"
                required=""
              />
            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">
              Create
            </button>

            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
          </form>
        </div>`;
  const form = createDiv.querySelector("form");
  form.addEventListener("submit", onSubmit);

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("imageURL");
    const idea = { title, description, img };
    if (!title || !description || !img) {
      return;
    }
    const resultIdea = await createIdea(idea, getAccessToken());
    if (resultIdea) {
      goTo("/catalog");
    }
  }

  showSection(createDiv);
}
