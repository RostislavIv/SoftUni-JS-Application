import { LitElement, html } from "lit";

class NavComponent extends LitElement {
  static styles = css`
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3em 3em;
      background: #7d7e7e;
    }

    nav {
      background-color: #7a6e6e;
      height: 0px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      color: aliceblue;
    }

    #logo {
      font-style: italic;
      font-size: 30px;
    }

    #logo-img {
      height: 70px;
    }

    nav a {
      font-size: 1.5rem;
      color: #0a0a0a;
      font-weight: 400;
    }

    header a {
      padding: 0 10px;
      text-decoration: none;
      color: aliceblue;
    }

    header a:hover {
      color: rgb(202, 203, 204);
    }
  `;

  static properties = {
    authService: { type: Object },
    router: { type: Object },
    isLog: { type: Boolean },
  };

  constructor() {
    super();
    this.authService = undefined;
    this.router = undefined;
    this.isLog = undefined;
    this.logoutHandler = this._logoutHendler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.isLog = this.authService.isLog();
  }

  async _logoutHendler() {
    await this.authService.logout();
    this.router.navigate("/dashboard");
  }

  render() {
    const navUserTemplate = html` <div class="user">
      <a href="/create">Add Pair</a>
      <a href="javascript:void(0)" @click=${this.logoutHandler}>Logout</a>
    </div>`;

    const navGuestTemplate = html` <div class="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>`;

    const navTemplate = html` <a id="logo" href="/"
        ><img id="logo-img" src="./images/logo.png" alt=""
      /></a>

      <nav>
        <div>
          <a href="/dashboard">Dashboard</a>
          <a href="/search">Search</a>
        </div>
        ${this.isLog ? navUserTemplate : navGuestTemplate}
      </nav>`;

    return navTemplate;
  }
}

//Initialize "nav-comp"
customElements.define("nav-comp", NavComponent);

// export class NavComponent {
//   constructor(authService, renderHendler, templateFunction, router) {
//     this.authService = authService;
//     this.renderHendler = renderHendler;
//     this.templateFunction = templateFunction;
//     this.router = router;
//     this.showView = this._showView.bind(this);
//     this.logoutHendler = this._logoutHendler.bind(this);
//   }

//   _showView(ctx, next) {
//     const isLog = this.authService.isLog();
//     const template = this.templateFunction(isLog, this.logoutHendler);
//     this.renderHendler(template);
//     next();
//   }

//   async _logoutHendler() {
//     await this.authService.logout();
//     this.router.navigate("/dashboard");
//   }
// }
