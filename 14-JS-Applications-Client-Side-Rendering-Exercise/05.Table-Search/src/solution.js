import { render } from "../../node_modules/lit-html/lit-html.js";
import { templateBody } from "./templates.js";
import { getData } from "./requests.js";

const body = document.querySelector("body");
const students = await getData();
render(templateBody(students), body);
const searchField = document.querySelector("#searchField");

document
  .querySelector("#searchBtn")
  .addEventListener("click", () => onClick(searchField));

function onClick(searchField) {
  const searchText = searchField.value;
  if (searchText.trim() != "") {
    students.forEach((student) => {
      const fullName = `${student.firstName} ${student.lastName}`;
      const email = student.email;
      const course = student.course;
      const id = student._id;
      const isSelected =
        isMatch(fullName, searchText) ||
        isMatch(email, searchText) ||
        isMatch(course, searchText);
      const row = document.getElementById(id);
      row.className = isSelected ? "select" : "";
    });
    searchBtn.value = "";
  }
}

function isMatch(text, searchText) {
  return text.toLowerCase().includes(searchText.toLowerCase());
}
