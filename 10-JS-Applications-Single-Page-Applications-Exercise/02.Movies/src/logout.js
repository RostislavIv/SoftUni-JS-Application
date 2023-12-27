import { showHome } from "./home.js";
import { requestLogout } from "./requestData.js";

export async function logout() {
  await requestLogout();
  showHome();
}
