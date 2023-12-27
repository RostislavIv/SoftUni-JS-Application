console.log("TODO:// Implement Home functionality");
var userDiv = document.getElementById("user");
var guestDiv = document.getElementById("guest");
var emailSpanElem = document.querySelector(".email span");
var addForm = document.getElementById("addForm");
var addButton = document.querySelector(".add");
var logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", onLogout);
var loadBtn = document.querySelector("aside button.load");
loadBtn.addEventListener("click", onLoad);

function loadHomePage() {
  if (!sessionStorage.getItem("accessToken")) {
    userDiv.style.display = "none";
    guestDiv.style.display = "inline-block";
    emailSpanElem.textContent = "guest";
    addButton.disabled = true;
    addForm.removeEventListener("submit", onAdd);
  } else {
    userDiv.style.display = "inline-block";
    guestDiv.style.display = "none";
    emailSpanElem.textContent = sessionStorage.getItem("email");
    addButton.disabled = false;
    addForm.addEventListener("submit", onAdd);
  }
  onLoad();
}

async function onLogout() {
  var urlLogout = "http://localhost:3030/users/logout";
  var settings = {
    method: "GET",
    headers: { "X-Authorization": sessionStorage.accessToken },
  };
  try {
    var responce = await fetch(urlLogout, settings);
    if (responce.status != 204) {
      throw new Error(responce.statusText);
    }
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("accessToken", "");
    sessionStorage.setItem("userId", "");
    loadHomePage();
  } catch (err) {
    console.error(err.message);
  }
}

async function onLoad() {
  var urlLoad = "http://localhost:3030/data/catches";
  console.log("ok");
  try {
    var responce = await fetch(urlLoad);
    if (responce.status != 200) {
      throw new Error(responce.statusText);
    }
    var catches = await responce.json();
    var catchesDiv = document.getElementById("catches");
    catchesDiv.innerHTML = "";
    catches.forEach((c) => {
      var div = document.createElement("div");
      div.innerHTML = `
                    <div class="catch">
                        <label>Angler</label>
                        <input type="text" class="angler" value=${c.angler}>
                        <label>Weight</label>
                        <input type="text" class="weight" value=${c.weight}>
                        <label>Species</label>
                        <input type="text" class="species" value=${c.species}>
                        <label>Location</label>
                        <input type="text" class="location" value=${c.location}>
                        <label>Bait</label>
                        <input type="text" class="bait" value=${c.bait}>
                        <label>Capture Time</label>
                        <input type="number" class="captureTime" value=${c.captureTime}>
                        <button class="update" data-id=${c._id}>Update</button>
                        <button class="delete" data-id=${c._id}>Delete</button>
                    </div>
        `;
      var updateBtn = div.querySelector("button.update");
      var deleteBtn = div.querySelector("button.delete");
      updateBtn.disabled = !(c._ownerId == sessionStorage.getItem("userId"));
      deleteBtn.disabled = !(c._ownerId == sessionStorage.getItem("userId"));
      updateBtn.addEventListener("click", onUpdate);
      deleteBtn.addEventListener("click", onDelete);
      catchesDiv.appendChild(div);
    });
  } catch (err) {
    console.error(err.message);
  }

  async function onUpdate(e) {
    var id = e.target.dataset.id;
    var div = e.target.parentNode;
    var angler = div.querySelector("input.angler").value;
    var weight = div.querySelector("input.weight").value;
    var species = div.querySelector("input.species").value;
    var location = div.querySelector("input.location").value;
    var bait = div.querySelector("input.bait").value;
    var captureTime = div.querySelector("input.captureTime").value;
    var catchToUpdate = {
      angler,
      weight,
      species,
      location,
      bait,
      captureTime,
    };
    var urlUpdateCatch = `http://localhost:3030/data/catches/${id}`;
    var settings = {
      method: "PUT",
      headers: { "X-Authorization": sessionStorage.getItem("accessToken") },
      body: JSON.stringify(catchToUpdate),
    };
    try {
      var responce = await fetch(urlUpdateCatch, settings);
      if (responce.status != 200) {
        throw new Error(responce.statusText);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function onDelete(e) {
    var id = e.target.dataset.id;
    var urlDeleteCatch = `http://localhost:3030/data/catches/${id}`;
    var settings = {
      method: "DELETE",
      headers: { "X-Authorization": sessionStorage.getItem("accessToken") },
    };
    try {
      var responce = await fetch(urlDeleteCatch, settings);
      if (responce.status != 200) {
        throw new Error(responce.statusText);
      }
      e.target.parentNode.remove();
    } catch (err) {
      console.error(err.message);
    }
  }
}

async function onAdd(e) {
  e.preventDefault();
  var formData = new FormData(addForm);
  var angler = formData.get("angler");
  var weight = formData.get("weight");
  var species = formData.get("species");
  var location = formData.get("location");
  var bait = formData.get("bait");
  var captureTime = formData.get("captureTime");
  var catchToAdd = { angler, weight, species, location, bait, captureTime };
  if (!angler || !weight || !species || !location || !bait || !captureTime) {
    return;
  }
  var urlAddCatch = "http://localhost:3030/data/catches";
  var settings = {
    method: "POST",
    headers: { "X-Authorization": sessionStorage.getItem("accessToken") },
    body: JSON.stringify(catchToAdd),
  };
  try {
    var responce = await fetch(urlAddCatch, settings);
    if (responce.status != 200) {
      throw new Error(responce.statusText);
    }
    addForm.reset();
    onLoad();
  } catch (err) {
    console.error(err.message);
  }
}

loadHomePage();
