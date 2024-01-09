import { Quiz } from "./quiz.js";

export class QuizComponent {
  _quiz = undefined;

  constructor(quizzesService, mainRender, quizTemplate, router) {
    this.quizzesService = quizzesService;
    this.mainRender = mainRender;
    this.quizTemplate = quizTemplate;
    this.router = router;
    this.show = this._show.bind(this);
    this.answerHandler = this._answerHandler.bind(this);
    this.quiz = this._quiz;
    this.commander = this._commander;
  }

  async _show(ctx) {
    const query = ctx.params.id;
    let [quizId, command, index] = query.split("=");

    if (!this.quiz) {
      const quizData = await this.quizzesService.getQuizById(quizId);
      const questionsData = await this.quizzesService.getQuestions(
        quizData.questions
      );
      this.quiz = new Quiz(quizData, questionsData.questions);
    }

    if (command === "end") {
      const resultQuiz = this.quiz.getResultQuiz();
      await this.quizzesService.saveResultUser(resultQuiz);
      this.router.show("/quizResult");
    }

    if (command) {
      this.commander[command](index);
      this.quiz.updateStates();
    }

    const template = this.quizTemplate(this.quiz, this.answerHandler);
    this.mainRender(template);
  }

  _commander = {
    goTo: (index) => this.quiz.goTo(index),
    start: () => this.quiz.start(),
    next: () => this.quiz.next(),
    previous: () => this.quiz.previous(),
    end: () => this.end(),
  };

  _answerHandler(e, indexAnswer) {
    this.quiz.setAnswer(indexAnswer);
  }
}
