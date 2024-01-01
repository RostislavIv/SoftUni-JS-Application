import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getTeam, updateTeam } from "../services/reqestsData.js";

export async function showEdit(ctx) {
  const teamId = ctx.params.id;
  const team = await getTeam(teamId);
  const onEdit = async (e, teamId) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const team = Object.fromEntries([...formData.entries()]);

    try {
      await updateTeam(teamId, team);
      ctx.page.redirect(`/details/${teamId}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const template = tempEdit(team, onEdit);
  ctx.render(template);
}

const tempEdit = (team, onEdit) => html` <section id="edit">
  <article class="narrow">
    <header class="pad-med">
      <h1>Edit Team</h1>
    </header>
    <form
      @submit=${(e) => onEdit(e, team._id)}
      id="edit-form"
      class="main-form pad-large"
    >
      ${team.error ? html`<div class="error">Error message.</div>` : null}
      <label
        >Team name: <input type="text" name="name" .value=${team.name}
      /></label>
      <label
        >Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}
      /></label>
      <label
        >Description:
        <textarea name="description" .value=${team.description}></textarea>
      </label>
      <input class="action cta" type="submit" value="Save Changes" />
    </form>
  </article>
</section>`;
