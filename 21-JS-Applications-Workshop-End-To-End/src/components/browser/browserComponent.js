export class BrowserComponent {
  constructor(quizzesService, mainRender, browserTemplate, router) {
    this.quizzesService = quizzesService;
    this.mainRender = mainRender;
    this.browserTemplate = browserTemplate;
    this.router = router;
    this.show = this._show.bind(this);
    this.filetrHandler = this._filetrHandler.bind(this);
  }

  async _show(ctx) {
    const query = ctx.querystring;
    let quizzes = await this.quizzesService.getAllQuizzes();
    const topics = [...new Set(quizzes.map((q) => q.topic))];
    const filterTopic = query.split("=")[1];
    if (filterTopic && filterTopic != "all") {
      quizzes = quizzes.filter((q) => q.topic === filterTopic);
    }
    const template = this.browserTemplate(topics, this.filetrHandler, quizzes);
    this.mainRender(template);
  }

  _filetrHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const topic = formData.get("topic");
    this.router.show(`/browser?topic=${topic}`);
  }
}
