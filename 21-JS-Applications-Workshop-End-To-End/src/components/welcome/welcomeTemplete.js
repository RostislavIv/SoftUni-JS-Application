import { html } from "../../../node_modules/lit-html/lit-html.js";

export const welcomeTemplate = (
  quizes,
  topics,
  mostRecentQuiz,
  takenTimes
) => html` <section id="welcome">
  <div class="hero layout">
    <div class="splash right-col"><i class="fas fa-clipboard-list"></i></div>
    <div class="glass welcome">
      <h1>Welcome to Quiz Fever!</h1>
      <p>
        Home to ${quizes} quizes in ${topics} topics.
        <a href="/browse">Browse all quizes</a>.
      </p>
      <a class="action cta" href="/login">Sign in to create a quiz</a>
    </div>
  </div>

  <div class="pad-large alt-page">
    <h2>Our most recent quiz:</h2>

    <article class="preview layout">
      <div class="right-col">
        <a class="action cta" href="/details">View Quiz</a>
      </div>
      <div class="left-col">
        <h3>${mostRecentQuiz.title}</h3>
        <span class="quiz-topic">Topic: ${mostRecentQuiz.topic}</span>
        <div class="quiz-meta">
          <span>${mostRecentQuiz.questionCount} questions</span>
          <span>|</span>
          <span>Taken ${takenTimes} times</span>
        </div>
      </div>
    </article>

    <div>
      <a class="action cta" href="/browse">Browse all quizes</a>
    </div>
  </div>
</section>`;
