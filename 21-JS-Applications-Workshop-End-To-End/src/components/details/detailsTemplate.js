import { html } from "../../../node_modules/lit-html/lit-html.js";

export const detailsTemplate = (quiz, isLog) => html` <section id="details">
  <div class="pad-large alt-page">
    <article class="details">
      <h1>${quiz.title}</h1>
      <span class="quiz-topic"
        >A quiz by <a href="/owner/${quiz.owner.id}">Peter</a> on the topic of
        ${quiz.topic}</span
      >
      <div class="quiz-meta">
        <span>${quiz.questionsCount} Questions</span>
        <span>|</span>
        <span>Taken ${quiz.taken} times</span>
      </div>
      <p class="quiz-desc">${quiz.description}</p>
      ${isLog
        ? html`<div>
            <a class="cta action" href="/quiz/${quiz.id}">Begin Quiz</a>
          </div>`
        : ""}
    </article>
  </div>
</section>`;
