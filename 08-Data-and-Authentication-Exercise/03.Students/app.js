const url = "http://localhost:3030/jsonstore/collections/students";
const form = document.getElementById("form");
form.addEventListener("submit", addStudent);

async function loadStudents() {
  try {
    var responce = await fetch(url);
    if (responce.status != 200) {
      throw new Error(responce.statusText);
    }
    var result = await responce.json();
    var students = Object.values(result);

    const studentsList = document.querySelector("#results tbody");
    studentsList.innerHTML = "";
    students.forEach((s) => (studentsList.innerHTML += showStudent(s)));
  } catch (err) {
    console.error(err.message);
  }
}

async function addStudent(e) {
  e.preventDefault();
  var data = new FormData(e.target);
  var firstName = data.get("firstName").trim();
  var lastName = data.get("lastName").trim();
  var facultyNumber = data.get("facultyNumber").trim();
  var grade = data.get("grade").trim();

  if (firstName == "" || lastName == "" || facultyNumber == "" || grade == "") {
    return;
  }

  var student = { firstName, lastName, facultyNumber, grade };
  var settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  };

  try {
    var responce = await fetch(url, settings);
    if (responce.status != 200) {
      throw new Error(responce.statusText);
    }
    const studentsList = document.querySelector("#results tbody");
    studentsList.innerHTML += showStudent(student);
    var inputs = document.querySelectorAll(
      "#form > div.inputs > input[type=text]"
    );
    inputs.forEach((x) => (x.value = ""));
  } catch (err) {
    console.error(err.message);
  }
}

function showStudent(student) {
  var innerHTML = `
            <tr>
            <th>${student.firstName}</th>
            <th>${student.lastName}</th>
            <th>${student.facultyNumber}</th>
            <th>${student.grade}</th>
            </tr>
            `;
  return innerHTML;
}

loadStudents();
