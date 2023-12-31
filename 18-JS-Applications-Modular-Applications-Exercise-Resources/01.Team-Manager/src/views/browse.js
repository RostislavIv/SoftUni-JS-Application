import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMembers, getAllTeams } from "../services/reqestsData.js";

export async function showBrowse(ctx) {
  let teams = await getAllTeams();
  let members = await getAllMembers();
  const membersCount = {};
  members.forEach((member) => {
    if (!membersCount.hasOwnProperty(member.teamId)) {
      membersCount[member.teamId] = 1;
    } else {
      membersCount[member.teamId] += 1;
    }
  });
  const isLog = ctx.user ? true : false;
  const template = tempBrose(isLog, teams, membersCount);
  ctx.render(template);
}

const tempBrose = (isLog, teams, counts) => html` <section id="browse">
  <article class="pad-med">
    <h1>Team Browser</h1>
  </article>
  ${isLog ? tempCreate : null} ${teams.map((team) => tempTeam(team, counts))}
</section>`;

const tempCreate = html` <article class="layout narrow">
  <div class="pad-small">
    <a href="/crate" class="action cta">Create Team</a>
  </div>
</article>`;

const tempTeam = (t, counts) => {
  const count = counts[t._id] ? counts[t._id] : 0;
  const template = html` <article class="layout">
    <img src=${t.logoUrl} class="team-logo left-col" />
    <div class="tm-preview">
      <h2>${t.name}</h2>
      <p>${t.description}</p>
      <span class="details">${count}</span>
      <div><a href="/details" class="action">See details</a></div>
    </div>
  </article>`;
  return template;
};
