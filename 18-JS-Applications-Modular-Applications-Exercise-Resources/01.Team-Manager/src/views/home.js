import { html } from "../../node_modules/lit-html/lit-html.js";

export function showHome(ctx) {
  const isLog = ctx.user ? true : false;
  const template = tempHome(isLog);
  ctx.render(template);
}

const templGuest = html`<a href="/login" class="action cta">Sign Up Now</a>`;

const tempHome = (isLog) => html` <section id="home">
  <article class="hero layout">
    <img src="./assets/team.png" class="left-col pad-med" />
    <div class="pad-med tm-hero-col">
      <h2>Welcome to Team Manager!</h2>
      <p>Want to organize your peers? Create and manage a team for free.</p>
      <p>
        Looking for a team to join? Browse our communities and find like-minded
        people!
      </p>
      ${!isLog ? templGuest : null}
      <a href="/browse" class="action cta">Browse Teams</a>
    </div>
  </article>
</section>`;
