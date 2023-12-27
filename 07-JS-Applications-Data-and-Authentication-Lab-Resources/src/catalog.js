import { requestServer } from "./accessServer.js";

export async function catalog(main, buttons) {
  if (sessionStorage.getItem("accessToken")) {
    buttons.create.style.display = "inline-block";
    buttons.logout.style.display = "inline-block";
    buttons.login.style.display = "none";
    buttons.register.style.display = "none";
  } else {
    buttons.create.style.display = "none";
    buttons.logout.style.display = "none";
    buttons.login.style.display = "inline-block";
    buttons.register.style.display = "inline-block";
  }

  let url = "http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg";
  let settings = { method: "GET" };
  let result = await requestServer(url, settings);
  if (!result.error) {
    const fragment = document.createDocumentFragment();
    result.forEach((r) => {
      const div = document.createElement("div");
      div.innerHTML = `
    <article id=${r._id} class="preview">
        <div class="title">
            <h2>${r.name}</h2>
        </div>
        <div class="small">
            <img src=${r.img}>
        </div>
    </article>`;
      div.showMore = true;

      div.addEventListener("click", () => showDetailRecipe(div));

      fragment.appendChild(div);
    });
    main.innerHTML = "";
    main.appendChild(fragment);
  }
}

async function showDetailRecipe(div) {
  let id = div.querySelector("article").id;
  let url = `http://localhost:3030/data/recipes/${id}`;
  let settings = {
    method: "GET",
  };
  let recipe = await requestServer(url, settings);

  if (div.showMore) {
    div.innerHTML = `
<article id=${recipe._id}>
            <h2>${recipe.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src=${recipe.img}>
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul> ${createLi(recipe.ingredients)}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                  ${createP(recipe.steps)}
            </div>
        </article>`;
    div.showMore = false;

    function createLi(ingredients) {
      let result = "";
      ingredients.forEach((x) => (result += `<li>${x}</li>`));
      return result;
    }

    function createP(steps) {
      let result = "";
      steps.forEach((x) => (result += `<p>${x}</p>`));
      return result;
    }
  } else {
    div.innerHTML = `        
    <article id=${recipe._id} class="preview">
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src=${recipe.img}>
        </div>
    </article>`;
    div.showMore = true;
  }
}
