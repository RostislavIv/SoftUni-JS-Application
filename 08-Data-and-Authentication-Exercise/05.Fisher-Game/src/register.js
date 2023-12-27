console.log("TODO:// Implement Register functionality");

function register() {
  var userDiv = document.getElementById("user");
  userDiv.style.display = "none";
  var notificationElem = document.querySelector(".notification");
  notificationElem.textContent = "";
  var formElem = document.querySelector("form");
  formElem.addEventListener("submit", onRegister);

  async function onRegister(e) {
    e.preventDefault();
    var formData = new FormData(formElem);
    var email = formData.get("email").trim();
    var password = formData.get("password").trim();
    var rePass = formData.get("rePass").trim();

    if (!email) {
      notificationElem.textContent = "Email is not correct";
      return;
    }
    if (!password) {
      notificationElem.textContent = "Password is not correct";
      return;
    }
    if (password != rePass) {
      notificationElem.textContent = "Repeat password is not correct";
      return;
    }
    notificationElem.textContent = "";

    var urlRegister = "http://localhost:3030/users/register";
    var settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    try {
      var responce = await fetch(urlRegister, settings);
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

register();
