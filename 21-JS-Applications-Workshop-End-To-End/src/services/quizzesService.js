export class QuizzesService {
  _cache = {};
  constructor() {
    this.cache = this._cache;
  }

  async getQuizzes() {
    const currentUser = Parse.User.current();
    const resultsUser = currentUser ? currentUser.get("results") : undefined;

    if (!this.cache.quizzes) {
      const query = new Parse.Query("quizzes");
      this.cache.quizzes = await query.find();
    }
    const results = this.cache.quizzes;
    const quizzes = [];
    try {
      for (const object of results) {
        let taken = 0;
        if (resultsUser && resultsUser[object.id]) {
          taken = resultsUser[object.id];
        }
        const quiz = {
          id: object.id,
          owner: object.get("owner"),
          title: object.get("title"),
          topic: object.get("topic"),
          description: object.get("description"),
          questionsCount: object.get("questionsCount"),
          questions: object.get("questions"),
          taken: object.get("taken"),
        };
        quizzes.push(quiz);
      }
      return quizzes;
    } catch (error) {
      console.error("Error while fetching MyCustomClassName", error);
    }
  }

  async getQuizById(id) {
    const currentUser = Parse.User.current();
    const resultsUser = currentUser ? currentUser.get("results") : undefined;
    const object = this.cache.quizzes.find((q) => q.id === id);
    if (!object) {
      const query = new Parse.Query("quizzes");
      query.equalTo("objectId", id);
      const results = await query.find();
      object = results[0];
      this.cache.quizzes.push(object);
    }
    try {
      let taken = 0;
      if (resultsUser && resultsUser[id]) {
        taken = resultsUser[id];
      }
      const quiz = {
        id: object.id,
        owner: object.get("owner"),
        title: object.get("title"),
        topic: object.get("topic"),
        description: object.get("description"),
        questionsCount: object.get("questionsCount"),
        questions: object.get("questions"),
        taken: taken,
      };
      return quiz;
    } catch (error) {
      console.error("Error while fetching MyCustomClassName", error);
    }
  }

  async getQuestions(questions) {
    const results = await questions.fetch();
    const result = {
      id: results.id,
      questions: results.get("questions"),
    };
    return result;
  }

  isLog() {
    return Parse.User.current() ? true : false;
  }
}

// async getAll() {
//   const url = this.url.getAll;
//   const settings = {
//     method: "GET",
//   };
//   const albums = await this._innerFetch(url, settings);
//   return albums;
// }
// async getById(id) {
//   const url = `${this.url.pathQuizzes}/${id}`;
//   const settings = {
//     method: "GET",
//   };
//   const albums = await this._innerFetch(url, settings);
//   return albums;
// }
// async create(album) {
//   const url = `${this.url.pathQuizzes}`;
//   const accessToken = this.sessionService.getAccessToken();
//   const settings = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Authorization": accessToken,
//     },
//     body: JSON.stringify(album),
//   };
//   const createdAlbum = await this._innerFetch(url, settings);
//   return createdAlbum;
// }
// async edit(id, album) {
//   const url = `${this.url.pathQuizzes}/${id}`;
//   const accessToken = this.sessionService.getAccessToken();
//   const settings = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Authorization": accessToken,
//     },
//     body: JSON.stringify(album),
//   };
//   const editedAlbum = await this._innerFetch(url, settings);
//   return editedAlbum;
// }
// async delete(id) {
//   const url = `${this.url.pathQuizzes}/${id}`;
//   const accessToken = this.sessionService.getAccessToken();
//   const settings = {
//     method: "DELETE",
//     headers: {
//       "X-Authorization": accessToken,
//     },
//   };
//   const deletedAlbum = await this._innerFetch(url, settings);
//   return deletedAlbum;
// }
// isLog() {
//   return this.sessionService.isLog();
// }
// isOwner(id) {
//   return this.sessionService.isOwner(id);
// }
