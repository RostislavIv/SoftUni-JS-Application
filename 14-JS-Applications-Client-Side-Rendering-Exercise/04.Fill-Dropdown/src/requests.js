export { getOption, addOption };
const url = "http://localhost:3030/jsonstore/advanced/dropdown";

async function getOption() {
  const settings = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const result = await innerFetch(url, settings);
  return Object.values(result);
}

async function addOption(option) {
  const settings = {
    method: "POST",
    body: JSON.stringify({ text: option }),
  };
  const result = await innerFetch(url, settings);
  return result;
}

async function innerFetch(url, settings) {
  try {
    const responce = await fetch(url, settings);
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const result = await responce.json();
    return result;
  } catch (err) {
    console.log(err).message;
  }
}
