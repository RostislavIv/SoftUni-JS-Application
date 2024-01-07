import { html } from "../../../node_modules/lit-html/lit-html.js";

export const browserTemplate = (
  topics,
  filetrHandler,
  quizzes
) => html` <section id="browse">
  <header class="pad-large">
    <form class="browse-filter" @submit=${filetrHandler}>
      <input class="input" type="text" name="query" />
      <select class="input" name="topic">
        <option value="all">All Categories</option>
        ${topics.map((t) => html`<option value=${t}>${t}</option>`)}
      </select>
      <input class="input submit action" type="submit" value="Filter Quizes" />
    </form>
    <h1>All quizes</h1>
  </header>

  <div class="pad-large alt-page async">
    <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
  </div>

  <div class="pad-large alt-page">
    ${quizzes.map(
      (quiz) => html` <article class="preview layout">
        <div class="right-col">
          <a class="action cta" href="/details">View Quiz</a>
        </div>
        <div class="left-col">
          <h3>
            <a class="quiz-title-link" href="/details">${quiz.title}</a>
          </h3>
          <span class="quiz-topic">${quiz.topic}</span>
          <div class="quiz-meta">
            <span>${quiz.statistic.questionsCount} questions</span>
            <span>|</span>
            <span>Taken ${quiz.statistic.taken} times</span>
          </div>
        </div>
      </article>`
    )}
  </div>
</section>`;
