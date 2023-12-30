import { isUser } from "./services/authorization.js";

export function updateNav() {
  const userNav = document.getElementById("user");
  const guestNav = document.getElementById("guest");

  userNav.style.display = isUser() ? "inline-block" : "none";
  guestNav.style.display = !isUser() ? "inline-block" : "none";
}

export function isValid(furneture) {
  const valdidations = {
    make: (v) => v.length >= 4,
    model: (v) => v.length >= 4,
    year: (v) => !isNaN(v) && 1950 <= Number(v) && Number(v) <= 2050,
    description: (v) => v.length > 10,
    price: (v) => !isNaN(v) && Number(v) > 0,
    img: (v) => v !== "",
    material: (v) => true,
  };

  let isValidAllField = true;
  Object.entries(furneture).forEach(([key, value]) => {
    if (valdidations[key]) {
      const isValidField = valdidations[key](value);
      if (!isValidField) {
        isValidAllField = false;
      }
      applayClass(key, isValidField);
    }
  });
  return isValidAllField;
}

function applayClass(input, isValid) {
  const inputElem = document.querySelector(`[name=${input}]`);
  inputElem.classList.remove("is-valid", "is-invalid");
  inputElem.classList.add(isValid ? "is-valid" : "is-invalid");
}
