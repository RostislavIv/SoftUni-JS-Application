const url = "http://localhost:3030/jsonstore/phonebook/";

function attachEvents() {
  const btnLoad = document.getElementById("btnLoad");
  const btnCreate = document.getElementById("btnCreate");
  btnLoad.addEventListener("click", loadPhonebook);
  btnCreate.addEventListener("click", createPhone);

  async function loadPhonebook() {
    try {
      var responce = await fetch(url);
      var result = await responce.json();
      if (responce.status != 200) {
        throw new Error(result.status);
      }

      var phonebook = document.getElementById("phonebook");
      phonebook.innerHTML = "";

      for (var x of Object.values(result)) {
        var button = document.createElement("button");
        button.textContent = "Delete";
        button.addEventListener("click", deletePhone);
        var li = document.createElement("li");
        li.textContent = `${x.person}: ${x.phone}`;
        li.id = x._id;
        li.appendChild(button);
        phonebook.appendChild(li);

        async function deletePhone(e) {
          var li = e.target.parentNode;
          var urlDelete = `${url}${li.id}`;
          var settings = { method: "DELETE" };
          try {
            var responce = await fetch(urlDelete, settings);
            if (responce.status != 200) {
              throw new Error(responce.statusText);
            }
            li.remove();
          } catch (err) {
            console.error(err.message);
          }
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function createPhone() {
    var personInput = document.getElementById("person");
    var phoneInput = document.getElementById("phone");
    var person = personInput.value.trim();
    var phone = phoneInput.value.trim();
    if (person == "" || phone == "") {
      return;
    }

    var body = JSON.stringify({ person: person, phone: phone });
    var settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    };
    try {
      var responce = await fetch(url, settings);
      if (responce.status != 200) {
        throw new Error(responce.message);
      }
      personInput.value = "";
      phoneInput.value = "";
    } catch (err) {
      console.error(err.message);
    }
  }
}

attachEvents();
