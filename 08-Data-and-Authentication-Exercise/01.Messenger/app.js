const url = "http://localhost:3030/jsonstore/messenger";

function attachEvents() {
  const submit = document.getElementById("submit");
  const refresh = document.getElementById("refresh");

  submit.addEventListener("click", submitMessage);
  refresh.addEventListener("click", refreshMessage);

  async function submitMessage() {
    const authorInput = document.querySelector('input[name="author"]');
    const contentInput = document.querySelector('input[name="content"]');
    const author = authorInput.value.trim();
    const content = contentInput.value.trim();

    if (author == "" || content == "") {
      return;
    }
    var body = JSON.stringify({ author: author, content: content });
    var settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    };

    try {
      var responce = await fetch(url, settings);
      if (responce.status != 200) {
        throw new Error(responce.statusText);
      }
      authorInput.value = "";
      contentInput.value = "";
    } catch (err) {
      console.error(err.message);
    }
  }

  async function refreshMessage() {
    try {
      var response = await fetch(url);
      if (response.status != 200) {
        throw new Error(response.statusText);
      }
      var messages = await response.json();
      const messagesTextArea = document.getElementById("messages");
      messagesTextArea.textContent = Object.values(messages)
        .map((x) => `${x.author}: ${x.content}`)
        .join("\n");
    } catch (err) {
      console.error(err.message);
    }
  }
}

attachEvents();
