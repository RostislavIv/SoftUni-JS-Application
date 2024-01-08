export class QuizComponent {
  constructor(quizzesService, mainRender, quizTemplate) {
    this.quizzesService = quizzesService;
    this.mainRender = mainRender;
    this.quizTemplate = quizTemplate;
    this.show = this._show.bind(this);
  }

  async _show(ctx) {
    const query = ctx.params.id;
    let [quizId, index] = query.split("=");
    const quiz = await this.quizzesService.getQuizById(quizId);
    const questions = await this.quizzesService.getQuestions(quiz.questions);

    index = Number(index);
    if (!index || index < 0) {
      index = 0;
    }
    if (index > questions.questions.length) {
      index = questions.questions.length;
    }
    const question = questions.questions[index];
    const states = [];
    const template = this.quizTemplate(quiz, question, index, states);
    this.mainRender(template);
  }
}
