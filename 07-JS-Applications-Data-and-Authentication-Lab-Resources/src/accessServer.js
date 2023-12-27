export async function requestServer(url, settings) {
  let result = "";
  try {
    let responce = await fetch(url, settings);
    if (responce.status != 200) {
      throw new Error(responce.statusText);
    }
    result = await responce.json();
  } catch (err) {
    result = err.message;
  }
  return result;
}
