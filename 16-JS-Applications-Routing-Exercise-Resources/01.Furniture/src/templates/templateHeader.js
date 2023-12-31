import { html } from "../../node_modules/lit-html/lit-html.js";
import { isUser } from "../services/authorization.js";

export const templateHeader = (isUser) => {
  return isUser
    ? html` <h1><a href="/">Furniture Store</a></h1>
        <nav>
          <a id="catalogLink" href="/" class="active">Dashboard</a>

          <div id="user">
            <a id="createLink" href="create">Create Furniture</a>
            <a id="profileLink" href="myFurniture">My Publications</a>
            <a id="logoutBtn" href="javascript:void(0)">Logout</a>
          </div>
        </nav>`
    : html` <h1><a href="/">Furniture Store</a></h1>
        <nav>
          <a id="catalogLink" href="/" class="active">Dashboard</a>

          <div id="guest">
            <a id="loginLink" href="login">Login</a>
            <a id="registerLink" href="register">Register</a>
          </div>
        </nav>`;
};

/*
      <h1><a href="/">Furniture Store</a></h1>
      <nav>
        <a id="catalogLink" href="/" class="active">Dashboard</a>

        <div id="user" style="display: none">
          <a id="createLink" href="create">Create Furniture</a>
          <a id="profileLink" href="myFurniture">My Publications</a>
          <a id="logoutBtn" href="javascript:void(0)">Logout</a>
        </div>

        <div id="guest" style="display: none">
          <a id="loginLink" href="login">Login</a>
          <a id="registerLink" href="register">Register</a>
        </div>

      </nav>
*/
