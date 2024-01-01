import { logoutRequest } from "./services/requestsAuth.js";

export async function logout(ctx) {
  try {
    await logoutRequest();
    ctx.page.show("/");
  } catch (err) {
    console.log(err.message);
  }
}
