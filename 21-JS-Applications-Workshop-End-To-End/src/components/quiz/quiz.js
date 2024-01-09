export class Quiz {
  constructor(quiz, questions) {
    this.id = quiz.id;
    this.title = quiz.title;
    this.questions = questions;
    this.questionsCount = this.questions.length;

    this.question = this.questions[0].question;
    this.answers = this.questions[0].answers;
    this.index = 0;
    this.remainQuestions = this.questions.length;
    this.states = this.questions.map(
      (q) =>
        new Object({
          answer: 0,
          correctAnswer: q.correctAnswer,
          questionIndex: "",
        })
    );
    this.states[0].questionIndex = "q-current";
  }

  updateStates() {
    for (let i = 0; i < this.states.length; i++) {
      const state = this.states[i];
      if (state.answer === 0 && i != this.index) {
        state.questionIndex = "";
      } else if (state.answer === 0 && i === this.index) {
        state.questionIndex = "q-current";
      } else if (i != this.index) {
        state.questionIndex = "q-answered";
      } else {
        state.questionIndex = "q-current q-answered";
      }
    }
    this.question = this.questions[this.index].question;
    this.answers = this.questions[this.index].answers;
    this.remainQuestions = this.states.filter(
      (state) => state.answer === 0
    ).length;
  }

  start() {
    this.index = 0;
    this.states.forEach((state) => {
      state.answer = 0;
    });
  }

  next() {
    if (this.index < this.questionsCount - 1) {
      this.index++;
    }
  }

  previous() {
    if (this.index > 0) {
      this.index--;
    }
  }

  goTo(index) {
    this.index = Number(index);
  }

  setAnswer(indexAnswer) {
    this.states[this.index].answer = indexAnswer;
  }

  getResultQuiz() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    var day = currentDate.getDate();
    const date = `${year} : ${month} : ${day}`;

    const correctAnswers = this.states.filter(
      (s) => s.answer === s.correctAnswer
    ).length;
    const procent = Math.round((correctAnswers / this.questionsCount) * 100);

    const resultQuiz = {
      quizId: this.id,
      title: this.title,
      correctAnswers: correctAnswers,
      questionsCount: this.questionsCount,
      procent: procent,
      date: date,
    };
    return resultQuiz;
  }
}
