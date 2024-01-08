import { html } from "../../../node_modules/lit-html/lit-html.js";

export const quizTemplate = (quiz, question, index, states) => html` <section
  id="quiz"
>
  <header class="pad-large">
    <h1>${quiz.title}: Question ${index + 1} / ${quiz.questionsCount}</h1>
    <nav class="layout q-control">
      <span class="block">Question index</span>
      ${states.map(
        (state, i) =>
          html`<a
            class="q-index"
            ${state}
            href="/quiz/${quiz.questions.id}=${i}"
          ></a>`
      )}
    </nav>
  </header>
  <div class="pad-large alt-page">
    <article class="question">
      <p class="q-text">${question.question}</p>

      <div>
        ${question.answers.map(
          (answer) => html`<label class="q-answer radio">
            <input class="input" type="radio" name="question-1" value="0" />
            <i class="fas fa-check-circle"></i>
            ${answer}
          </label>`
        )}
      </div>

      <nav class="q-control">
        <span class="block"
          >${states.filter((s) => s === "q-answered").length} questions
          remaining</span
        >
        <a class="action" href="/quiz/${quiz.id}=${Number(index) - 1}"
          ><i class="fas fa-arrow-left"></i> Previous</a
        >
        <a class="action" href="/quiz/${quiz.id}=start"
          ><i class="fas fa-sync-alt"></i> Start over</a
        >
        <div class="right-col">
          <a class="action" href="/quiz/${quiz.id}=${Number(index) + 1}"
            >Next <i class="fas fa-arrow-right"></i
          ></a>
          <a class="action" href="/quiz/${quiz.id}=end">Submit answers</a>
        </div>
      </nav>
    </article>
  </div>
</section>`;
