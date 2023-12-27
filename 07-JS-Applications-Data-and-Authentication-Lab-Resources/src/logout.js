import { requestServer } from "./accessServer.js";
import { catalog } from "./catalog.js";

export async function logout(main, buttons) {
  let url = " http://localhost:3030/users/logout ";
  let settings = {
    method: "GET",
    headers: { "X-Authorization": sessionStorage.getItem("accessToken") },
  };
  let result = await requestServer(url, settings);
  if (result == "No Content") {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
  }
  catalog(main, buttons);
}
