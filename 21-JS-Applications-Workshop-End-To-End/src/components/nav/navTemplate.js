import { html } from "../../../node_modules/lit-html/lit-html.js";

export const navTemplate = (isLog, logoutHandler) => html` <nav>
  <a class="logotype" href="/"
    ><i class="fas fa-question-circle"></i
    ><i class="merge fas fa-check-circle"></i><span>Quiz Fever</span></a
  >
  <div class="navigation">
    <a class="nav-link" href="/browse">Browse</a>
    ${isLog
      ? html` <div id="user-nav" style="display:block">
          <a class="nav-link" href="/create">Create</a>
          <a class="nav-link profile-link" href="#"
            ><i class="fas fa-user-circle"></i
          ></a>
          <a
            id="logoutBtn"
            class="nav-link"
            href="javascript:void(0)"
            @click=${logoutHandler}
            >Logout</a
          >
        </div>`
      : html` <div id="guest-nav" style="display:block">
          <a class="nav-link" href="/login">Sign in</a>
        </div>`}
  </div>
</nav>`;
