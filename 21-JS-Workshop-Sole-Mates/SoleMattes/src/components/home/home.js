import { LitElement, css, html } from "lit";

class HomeComponent extends LitElement {
  render() {
    return html` <section id="home">
      <h1>Welcome to Sole Mates</h1>
      <img src="/images/home.jpg" alt="home" />
      <h2>Browse through the shoe collectibles of our users</h2>
      <h3>Add or manage your items</h3>
    </section>`;
  }
}

//Initialize "home-comp"
customElements.define("home-component", HomeComponent);

// export class HomeComponent {
//   constructor(renderHendler, templateFunction) {
//     this.renderHendler = renderHendler;
//     this.templateFunction = templateFunction;
//     this.showView = this._showView.bind(this);
//   }

//   _showView() {
//     const template = this.templateFunction();
//     this.renderHendler(template);
//   }
// }
