export async function logout(
  logoutRequest,
  getAccessToken,
  removeUser,
  updateNav,
  goTo
) {
  const isLogout = await logoutRequest(getAccessToken());
  if (isLogout) {
    removeUser();
    updateNav();
    goTo("/catalog");
  }
}
