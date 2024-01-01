import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  getAllMembers,
  getAllTeams,
  getTeamsByMember,
} from "../services/reqestsData.js";

export async function showBrowse(ctx) {
  let teams;
  let title;

  const isMyTeamBtn = ctx.params.id === ctx.user._id;
  if (isMyTeamBtn) {
    teams = await getTeamsByMember(ctx.user._id);
    teams = teams.map((t) => t.team);
    title = "My Teams";
  } else {
    teams = await getAllTeams();
    title = "Team Browser";
  }

  let members = await getAllMembers();
  const membersCount = {};
  members
    .filter((m) => m.status === "member")
    .forEach((member) => {
      if (!membersCount.hasOwnProperty(member.teamId)) {
        membersCount[member.teamId] = 1;
      } else {
        membersCount[member.teamId] += 1;
      }
    });
  const isLog = ctx.user ? true : false;
  const template = tempBrose(isLog, teams, membersCount, title);
  ctx.render(template);
}

const tempBrose = (isLog, teams, counts, title) => html` <section id="browse">
  <article class="pad-med">
    <h1>${title}</h1>
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
      <div><a href="/details/${t._id}" class="action">See details</a></div>
    </div>
  </article>`;
  return template;
};

//  http://localhost:3030/data/members?where=teamId IN ({34a1cab1-81f1-47e5-aec3-ab6c9810efe1}) AND status="member"
