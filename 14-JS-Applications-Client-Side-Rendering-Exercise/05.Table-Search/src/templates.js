import { html } from "../../node_modules/lit-html/lit-html.js";
export { templateBody };

const templateBody = (data) => html` <table class="container">
  <thead>
    <tr>
      <th>Student name</th>
      <th>Student email</th>
      <th>Student course</th>
    </tr>
  </thead>

  <tbody>
    ${data.map((row) => templateRow(row))}
  </tbody>

  <tfoot>
    <tr>
      <td colspan="3">
        <input type="text" id="searchField" />
        <button type="button" id="searchBtn">Search</button>
      </td>
    </tr>
  </tfoot>
</table>`;

const templateRow = ({ firstName, lastName, email, course, _id }) => html` <tr
  id=${_id}
>
  <td>${firstName} ${lastName}</td>
  <td>${email}</td>
  <td>${course}</td>
</tr>`;
