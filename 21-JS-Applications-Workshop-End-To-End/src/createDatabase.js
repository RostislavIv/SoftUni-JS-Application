export async function createDatabase() {
  try {
    const user = await Parse.User.logIn("peter@abv.bg", "123456");
    console.log("Logged in user", user);
  } catch (error) {
    alert(`Error while logging in user: ${error.message}`);
    console.error("Error while logging in user", error);
  }
  const currentUser = Parse.User.current();

  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(false);
  if (currentUser) {
    acl.setReadAccess(currentUser, true);
    acl.setWriteAccess(currentUser, true);
  }

  for (let i = 1; i <= 10; i++) {
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
    Questions.setACL(acl);
    Questions.set("owner", currentUser);
    Questions.set("questions", questions);
    const resultQuestions = await Questions.save();
    const questionsCount = resultQuestions.get("questions").length;

    const Quizzes = new Parse.Object("quizzes");
    Quizzes.setACL(acl);
    Quizzes.set("owner", currentUser);
    Quizzes.set("title", `title_${i}`);
    Quizzes.set("topic", `topic_${i}`);
    Quizzes.set("description", `description_${i}`);
    Quizzes.set("taken", {});
    Quizzes.set("questionsCount", questionsCount);
    Quizzes.set("questions", Questions);
    await Quizzes.save();
  }
}
