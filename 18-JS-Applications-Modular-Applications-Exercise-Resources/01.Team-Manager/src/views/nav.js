import { html, render } from "../../node_modules/lit-html/lit-html.js";

export function showNav(ctx, next) {
  render(template(ctx.user), document.querySelector("nav"));
  next();
}

const template = (user) => html`<a href="/browse" class="action">Browse Teams</a
  >${user ? temlUserNav : templGuestNav}`;

const temlUserNav = html`<a href="/myTeam" class="action">My Teams</a>
  <a href="/logout" class="action">Logout</a>`;

const templGuestNav = html` <a href="/login" class="action">Login</a>
  <a href="/register" class="action">Register</a>`;

/*
                <a href="#" class="action">Browse Teams</a>

                <a href="#" class="action">Login</a>
                <a href="#" class="action">Register</a>

                <a href="#" class="action">My Teams</a>
                <a href="#" class="action">Logout</a>
                */
