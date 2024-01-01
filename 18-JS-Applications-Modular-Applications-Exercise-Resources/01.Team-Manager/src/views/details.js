import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  getMembers,
  getTeam,
  removeMember,
  joinMemeberToTeam,
  approveMemeberToTeam,
} from "../services/reqestsData.js";

export async function shoeDetails(ctx) {
  const teamId = ctx.params.id;
  const user = ctx.user;
  const team = await getTeam(teamId);
  const members = await getMembers(teamId);
  const membersIds = members.map((m) => m.user._id);
  const ownerName = members.find((m) => m.user._id === team._ownerId).user
    .username;
  const is = {
    noLogUser: false,
    logUser: false,
    owner: false,
    member: false,
    pending: false,
  };

  if (!user) is.noLogUser = true;
  else if (user._id === team._ownerId) {
    is.owner = true;
  } else if (membersIds.includes(user._id)) {
    is.member = true;
    if (members.find((m) => m.user._id === user._id).status === "pending") {
      is.pending = true;
    }
  } else {
    is.logUser = true;
  }

  const tempDetails = (is, team, members, ownerName) => html` <section
    id="team-home"
  >
    <article class="layout">
      <img src="../${team.logoUrl}" class="team-logo left-col" />
      <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details"
          >${members.filter((m) => m.status === "member").length} Members</span
        >
        <div>
          ${is.owner
            ? html`<a href="/edit/${team._id}" class="action">Edit team</a>`
            : null}
          ${is.logUser
            ? html`<a
                @click=${() => onJoinTeam(team._id)}
                href="#"
                class="action"
                >Join team</a
              >`
            : null}
          ${is.member && !is.pending
            ? html`<a
                @click=${() =>
                  onRemoveFormTeam(
                    members.find((m) => m._ownerId === user._id)._id
                  )}
                href="#"
                class="action invert"
                >Leave team</a
              >`
            : null}
          ${is.member && is.pending
            ? html`Membership pending.
                <a
                  @click=${() =>
                    onRemoveFormTeam(
                      members.find((m) => m._ownerId === user._id)._id
                    )}
                  href="#"
                  >Cancel request</a
                >`
            : null}
        </div>
      </div>
      <div class="pad-large">
        <h3>Members</h3>
        <ul class="tm-members">
          <li>${ownerName}</li>
          ${members
            .filter((m) => m.user._id != team._ownerId && m.status === "member")
            .map((member) => tempMember1(is, member))}
        </ul>
      </div>
      ${is.owner
        ? html` <div class="pad-large">
            <h3>Membership Requests</h3>
            <ul class="tm-members">
              ${members
                .filter((m) => m.status === "pending")
                .map((member) => tempMember2(member))}
            </ul>
          </div>`
        : null}
    </article>
  </section>`;

  const tempMember1 = (is, member) => html` <li>
    ${member.user.username}
    ${is.owner
      ? html`<a
          @click=${() => onRemoveFormTeam(member._id)}
          href="#"
          class="tm-control action"
          >Remove from team</a
        >`
      : null}
  </li>`;

  const tempMember2 = (member) => html`<li>
    ${member.user.username}
    <a @click=${() => onApprove(member._id)} href="#" class="tm-control action"
      >Approve</a
    ><a
      @click=${() => onRemoveFormTeam(member._id)}
      href="#"
      class="tm-control action"
      >Decline</a
    >
  </li>`;

  const template = tempDetails(is, team, members, ownerName);
  ctx.render(template);

  async function onApprove(memberId) {
    try {
      if (await approveMemeberToTeam(memberId)) {
        shoeDetails(ctx);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function onRemoveFormTeam(memberId) {
    try {
      if (await removeMember(memberId)) {
        shoeDetails(ctx);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function onJoinTeam(teamId) {
    try {
      if (await joinMemeberToTeam({ teamId })) {
        shoeDetails(ctx);
      }
    } catch {
      console.log(err.message);
    }
  }
}
