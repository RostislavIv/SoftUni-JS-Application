export class WelcomeComponent {
  constructor(quizzesService, mainRender, welcomeTemplate) {
    this.quizzesService = quizzesService;
    this.mainRender = mainRender;
    this.welcomeTemplate = welcomeTemplate;
    this.show = this._show.bind(this);
  }

  async _show(ctx) {
    const quizzes = await this.quizzesService.getAllQuizzes();
    const quizzesCount = quizzes.length;
    const topics = [...new Set(quizzes.map((q) => q.topic))];
    const topicsCount = topics.length;
    const mostRecentQuiz = quizzes.sort(
      (a, b) => b.statistic.taken - a.statistic.taken
    )[0];
    const template = this.welcomeTemplate(
      quizzesCount,
      topicsCount,
      mostRecentQuiz
    );
    ctx.params.quizzes = quizzes;
    this.mainRender(template);
  }
}
