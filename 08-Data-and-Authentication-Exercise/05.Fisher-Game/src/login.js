console.log("TODO:// Implement Login functionality");

function login() {
  var userDiv = document.getElementById("user");
  userDiv.style.display = "none";
  var notificationElem = document.querySelector(".notification");
  notificationElem.textContent = "";
  var formElem = document.querySelector("form");
  formElem.addEventListener("submit", onLogin);

  async function onLogin(e) {
    e.preventDefault();
    var formData = new FormData(formElem);
    var email = formData.get("email").trim();
    var password = formData.get("password").trim();

    if (!email) {
      notificationElem.textContent = "Empty email";
      return;
    }
    if (!password) {
      notificationElem.textContent = "Empty password";
      return;
    }
    notificationElem.textContent = "";

    var urlLogin = "http://localhost:3030/users/login";
    var settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    try {
      var responce = await fetch(urlLogin, settings);
      if (responce.status != 200) {
        throw new Error(responce.statusText);
      }
      var user = await responce.json();
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("accessToken", user.accessToken);
      sessionStorage.setItem("userId", user._id);
      window.location = "index.html";
    } catch (err) {
      notificationElem.textContent = err.message;
    }
  }
}

login();
