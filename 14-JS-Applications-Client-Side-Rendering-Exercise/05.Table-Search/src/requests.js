export { getData };

async function getData() {
  const url = "http://localhost:3030/jsonstore/advanced/table";
  const settings = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const responce = await fetch(url, settings);
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const data = await responce.json();
    return Object.values(data);
  } catch (err) {
    console.log(err.message);
  }
}
