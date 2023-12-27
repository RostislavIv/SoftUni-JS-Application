const loginDiv = document.getElementById("loginPage");
loginDiv.innerHTML = "";

export function loginPage(showSection, loginUser, setUser, updateNav, goTo) {
  loginDiv.innerHTML = `
          <div class="row-form d-md-flex flex-mb-equal">
          <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="" />
          </div>
          <form class="form-user col-md-7" action="" method="">
            <div class="text-center mb-4">
              <h1 class="h3 mb-3 font-weight-normal">Login</h1>
            </div>
            <div class="form-label-group">
              <label for="inputEmail">Email</label>
              <input
                type="text"
                id="inputEmail"
                name="email"
                class="form-control"
                placeholder="Email"
                required=""
                autofocus=""
              />
            </div>
            <div class="form-label-group">
              <label for="inputPassword">Password</label>
              <input
                type="password"
                id="inputPassword"
                name="password"
                class="form-control"
                placeholder="Password"
                required=""
              />
            </div>
            <div class="text-center mb-4 text-center">
              <button class="btn btn-lg btn-dark btn-block" type="submit">
                Sign In
              </button>
              <p class="alreadyUser">
                Don't have account? Then just <a href="/register">Sign-Up</a>!
              </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
          </form>
        </div>`;
  const form = loginDiv.querySelector("form");
  form.addEventListener("submit", onSubmit);

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return;
    }
    const user = await loginUser(email, password);
    if (user) {
      setUser(user);
      updateNav();
      goTo("/catalog");
    }
  }
  showSection(loginDiv);
}
