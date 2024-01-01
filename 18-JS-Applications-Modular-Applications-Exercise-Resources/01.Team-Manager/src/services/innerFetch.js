export async function innerFetch(url, settings) {
  try {
    const responce = await fetch(url, settings);
    if (responce.status == 204) {
      return true;
    }
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    const result = await responce.json();
    return result;
  } catch (err) {
    console.log(err.message);
  }
}
