import { html } from "../../../node_modules/lit-html/lit-html.js";

export const navTemplate = (isLog, logoutHenler) => html` <a id="logo" href="/"
    ><img id="logo-img" src="./images/logo.png" alt=""
  /></a>

  <nav>
    <div>
      <a href="/dashboard">Dashboard</a>
      <a href="/search">Search</a>
    </div>
    ${isLog ? navUserTemplate(logoutHenler) : navGuestTemplate}
  </nav>`;

const navUserTemplate = (logoutHenler) => html` <div class="user">
  <a href="/logout">Add Pair</a>
  <a href="javascript:void(0)" @click=${logoutHenler}>Logout</a>
</div>`;

const navGuestTemplate = html` <div class="guest">
  <a href="/login">Login</a>
  <a href="/register">Register</a>
</div>`;
