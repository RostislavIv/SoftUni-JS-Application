export async function createDatabase() {
  for (let i = 1; i <= 10; i++) {
    const quiz = {
      title: `title_${i}`,
      topic: `topic_${i}`,
      descriptionId: null,
      statisticId: null,
      questionId: null,
    };

    const Descriptions = new Parse.Object("descriptions");
    Descriptions.set("description", `description_${i}`);
    const resultDes = await Descriptions.save();
    quiz.descriptionId = resultDes.id;

    const Statistics = new Parse.Object("statistics");
    Statistics.set("statistic", { taken: 0 });
    const resultStat = await Statistics.save();
    quiz.statisticId = resultStat.id;

    const questions = [];
    for (let j = 1; j <= 20; j++) {
      const question = {
        question: `question_${j}`,
        answers: [],
        correctAnswer: Math.floor(Math.random() * 3) + 1,
      };
      for (let k = 1; k <= 3; k++) {
        const answer = `answer_${k}`;
        question.answers.push(answer);
      }
      questions.push(question);
    }

    const Questions = new Parse.Object("questions");
    Questions.set("questions", questions);
    const resulQuest = await Questions.save();
    quiz.questionId = resulQuest.id;

    const Quizzes = new Parse.Object("quizzes");
    Quizzes.set("quiz", quiz);
    await Quizzes.save();
  }
}
