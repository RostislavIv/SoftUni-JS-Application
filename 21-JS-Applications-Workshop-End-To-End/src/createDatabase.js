export async function createDatabase() {
  try {
    let user = await Parse.User.logIn("peter@abv.bg", "123456");
    console.log("Logged in user", user);
  } catch (error) {
    alert(`Error while logging in user: ${error.message}`);
    console.error("Error while logging in user", error);
  }
  const currentUser = Parse.User.current();

  for (let i = 1; i <= 10; i++) {
    const Descriptions = new Parse.Object("descriptions");
    Descriptions.set("description", `description_${i}`);
    const resultDes = await Descriptions.save();
    const descriptionId = resultDes.id;

    // const Statistics = new Parse.Object("statistics");
    // Statistics.set("statistic", { taken: 0 });
    // const resultStat = await Statistics.save();
    // quiz.statisticId = resultStat.id;

    const questions = [];
    const Questions = new Parse.Object("questions");
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
    Questions.addAll("questions", questions);
    const resulQuest = await Questions.save();
    const questionId = resulQuest.id;

    const Quizzes = new Parse.Object("quizzes");
    const quiz = {
      owner: currentUser.id,
      title: `title_${i}`,
      topic: `topic_${i}`,
      descriptionId: descriptionId,
      statistic: { taken: 0, questionsCount: questions.length },
      questionId: questionId,
    };
    Quizzes.set("quiz", quiz);
    // Quizzes.set("title", `title_${i}`);
    // Quizzes.set("topic", `topic_${i}`);
    // Quizzes.set("descriptionId", descriptionId);
    // Quizzes.set("taken", 0);
    // Quizzes.set("questionId", questionId);
    await Quizzes.save();
  }
}
