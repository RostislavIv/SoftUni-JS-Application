import { catalog } from "./catalog.js";

export function create(main, buttons) {
  main.innerHTML = `
          <article>
        <h2>New Recipe</h2>
        <form>
          <label
            >Name: <input type="text" name="name" placeholder="Recipe name"
          /></label>
          <label
            >Image: <input type="text" name="img" placeholder="Image URL"
          /></label>
          <label class="ml"
            >Ingredients:
            <textarea
              name="ingredients"
              placeholder="Enter ingredients on separate lines"
            ></textarea>
          </label>
          <label class="ml"
            >Preparation:
            <textarea
              name="steps"
              placeholder="Enter preparation steps on separate lines"
            ></textarea>
          </label>
          <input type="submit" value="Create Recipe" />
        </form>
      </article>`;
  let form = main.querySelector("form");
  form.addEventListener("submit", onCreate);

  async function onCreate(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let name = formData.get("name");
    let img = formData.get("img");
    let ingredients = formData.get("ingredients").split("\n");
    let steps = formData.get("steps").split("\n");
    let recipe = { name, img, steps, ingredients };
    let url = "http://localhost:3030/data/recipes";
    let settings = {
      method: "POST",
      headers: {
        "X-Authorization": sessionStorage.getItem("accessToken"),
        "Content-Type": "applicatin/json",
      },
      body: JSON.stringify(recipe),
    };
    let result = await fetch(url, settings);
    catalog(main, buttons);
  }
}
