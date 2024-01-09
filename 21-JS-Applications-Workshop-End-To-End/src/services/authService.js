export class AuthService {
  async login(userInput) {
    const { email, password } = userInput;
    try {
      let user = await Parse.User.logIn(email, password);
      console.log("Logged in user", user);
      return true;
    } catch (error) {
      alert(`Error while logging in user: ${error.message}`);
      console.error("Error while logging in user", error);
    }
  }

  async register(userInput) {
    const { username, email, password, repass } = userInput;
    const user = new Parse.User();
    user.set("username", username);
    user.set("email", email);
    user.set("password", password);
    user.set("results", []);

    try {
      let userResult = await user.signUp();
      console.log("User signed up", userResult);
      return true;
    } catch (error) {
      alert(`Error while signing up user: ${error.message}`);
      console.error("Error while signing up user", error);
    }
  }

  async logout() {
    const currentUser = Parse.User.current();
    if (currentUser) {
      await Parse.User.logOut();
      console.log("User logged out");
    } else {
      alert("No user logged in");
      console.log("No user logged in");
    }
  }

  isLog() {
    const currentUser = Parse.User.current();
    return currentUser ? true : false;
  }

  isOwner(ownerId) {
    const user = Parse.User.current();
    return user.id === ownerId;
  }
}
