import { showHome } from "./home.js";
import { requestDeleteMovie } from "./requestData.js";

export async function onDelete(id) {
  const result = await requestDeleteMovie(id);
  showHome();
}
