const registerDiv = document.getElementById("registerPage");
registerDiv.innerHTML = "";

export function registerPage(
  showSection,
  registerUser,
  setUser,
  updateNav,
  goTo
) {
  registerDiv.innerHTML = `
          <div class="row-form d-md-flex flex-mb-equal">
          <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="" />
          </div>
          <form class="form-user col-md-7" action="" method="">
            <div class="text-center mb-4">
              <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            </div>
            <div class="form-label-group">
              <label for="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                class="form-control"
                placeholder="Email"
                required=""
                autofocus=""
              />
            </div>
            <div class="form-label-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                placeholder="Password"
                required=""
              />
            </div>
            <div class="form-label-group">
              <label for="inputRepeatPassword">Repeat Password</label>
              <input
                type="password"
                id="inputRepeatPassword"
                name="repeatPassword"
                class="form-control"
                placeholder="Repeat Password"
                required=""
              />
            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">
              Sign Up
            </button>
            <div class="text-center mb-4">
              <p class="alreadyUser">
                Don't have account? Then just <a href="/login">Sign-In</a>!
              </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
          </form>
        </div>`;
  const form = registerDiv.querySelector("form");
  form.addEventListener("submit", onSubmit);

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatPassword");

    if (
      !email ||
      !password ||
      password != repeatPassword ||
      email.length < 3 ||
      password.length < 3
    ) {
      return;
    }
    const user = await registerUser(email, password);
    if (user) {
      setUser(user);
      updateNav();
      goTo("/catalog");
    }
  }
  showSection(registerDiv);
}
