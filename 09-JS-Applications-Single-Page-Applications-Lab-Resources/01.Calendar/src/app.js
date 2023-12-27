const yearsCalendar = document.getElementById("years");
[...yearsCalendar.querySelectorAll("td")].forEach((td) => {
  let year = td.querySelector("div.date").textContent;
  td.addEventListener("click", () => displayPage(`year-${year}`));
});

const monthCalendars = document.querySelectorAll("section.monthCalendar");
[...monthCalendars].forEach((x) => {
  let captionElem = x.querySelector("caption");
  captionElem.addEventListener("click", () => displayPage("years"));

  let monthsElem = x.querySelectorAll("td");
  [...monthsElem].forEach((month, index) => {
    let year = captionElem.innerText;
    month.addEventListener("click", () =>
      displayPage(`month-${year}-${index + 1}`)
    );
  });
});

const daysCalendars = document.querySelectorAll("section.daysCalendar");
[...daysCalendars].forEach((x) => {
  let captionElem = x.querySelector("caption");
  let year = x.id.split("-")[1];
  captionElem.addEventListener("click", () => displayPage(`year-${year}`));
});

function displayPage(id) {
  const sections = document.querySelectorAll("section");
  [...sections].forEach((s) => {
    if (s.id == id) {
      s.style.display = "block";
    } else {
      s.style.display = "none";
    }
  });
}

displayPage("years");
