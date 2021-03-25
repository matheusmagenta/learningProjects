import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  // async because it can be loaded from server-side
  async getHtml() {
    return `
        <h1>Welcome back</h1>
        <p> 
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
        </p>
        <p> 
            <a href="/posts" data-link>View recent posts</a>.
        </p>
        `;
  }
}
