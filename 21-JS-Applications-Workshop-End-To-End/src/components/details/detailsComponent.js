export class DetailsComponent {
  constructor(quizzesService, mainRender, detailsTemplate) {
    this.quizzesService = quizzesService;
    this.mainRender = mainRender;
    this.detailsTemplate = detailsTemplate;
    this.show = this._show.bind(this);
  }

  async _show(ctx) {
    const id = ctx.params.id;
    const quiz = await this.quizzesService.getQuizById(id);
    const isLog = this.quizzesService.isLog();
    const template = this.detailsTemplate(quiz, isLog);
    this.mainRender(template);
  }
}
