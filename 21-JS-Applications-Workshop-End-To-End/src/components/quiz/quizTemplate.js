import { html } from "../../../node_modules/lit-html/lit-html.js";

export const quizTemplate = (quiz, answerHandler) => html` <section id="quiz">
  <header class="pad-large">
    <h1>${quiz.title}: Question ${quiz.index + 1} / ${quiz.questionsCount}</h1>
    <nav class="layout q-control">
      <span class="block">Question index</span>
      ${quiz.states.map(
        (state, i) =>
          html`<a
            class="q-index ${state.questionIndex}"
            href="/quiz/${quiz.id}=goTo=${i}"
          ></a>`
      )}
    </nav>
  </header>
  <div class="pad-large alt-page">
    <article class="question">
      <p class="q-text">${quiz.question}</p>

      <div>
        ${quiz.answers.map(
          (answer, i) => html`<label class="q-answer radio">
            <input
              class="input"
              type="radio"
              name="question-${quiz.index + 1}"
              .value=${quiz.states[quiz.index].answer === i + 1 ? i + 1 : 0}
              @change=${(e) => answerHandler(e, i + 1)}
            />
            <i class="fas fa-check-circle"></i>
            ${answer}
          </label>`
        )}
      </div>

      <nav class="q-control">
        <span class="block">${quiz.remainQuestions} questions remaining</span>
        <a class="action" href="/quiz/${quiz.id}=previous"
          ><i class="fas fa-arrow-left"></i> Previous</a
        >
        <a class="action" href="/quiz/${quiz.id}=start"
          ><i class="fas fa-sync-alt"></i> Start over</a
        >
        <div class="right-col">
          <a class="action" href="/quiz/${quiz.id}=next"
            >Next <i class="fas fa-arrow-right"></i
          ></a>
          <a class="action" href="/quiz/${quiz.id}=end">Submit answers</a>
        </div>
      </nav>
    </article>
  </div>
</section>`;
