export function removeSections(sections) {
  Object.values(sections).forEach((s) => s.remove());
}
export function displayNav(container) {
  const email = sessionStorage.getItem("email");
  const userElems = container.querySelectorAll(".user");
  const guestElems = container.querySelectorAll(".guest");
  userElems.forEach((e) => (e.style.display = email ? "inline-block" : "none"));
  guestElems.forEach(
    (e) => (e.style.display = !email ? "inline-block" : "none")
  );
  container.querySelector("#welcome-msg").textContent = `Welcome, ${email}`;
}
