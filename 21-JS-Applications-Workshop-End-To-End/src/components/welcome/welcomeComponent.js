export class WelcomeComponent {
  constructor(quizzesService, mainRender, welcomeTemplate) {
    this.quizzesService = quizzesService;
    this.mainRender = mainRender;
    this.welcomeTemplate = welcomeTemplate;
    this.show = this._show.bind(this);
  }

  _show() {
    const quizes = 10;
    const topics = 15;
    const mostRecentQuiz = {
      title: "myTitle",
      topic: "mytopic",
      questionCount: "10",
    };
    const takenTimes = 10;
    const template = this.welcomeTemplate(
      quizes,
      topics,
      mostRecentQuiz,
      takenTimes
    );
    this.mainRender(template);
  }
}
