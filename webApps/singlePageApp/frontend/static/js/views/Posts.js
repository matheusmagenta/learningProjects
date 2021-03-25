import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Posts");
  }

  // async because it can be loaded from server-side
  async getHtml() {
    return `
        <h1>Posts</h1>
        <p> 
            lorem dsa as das das as sa dsa das lorem ipsum 
        </p>
        <p> 
            <a href="/posts" data-link>View recent posts</a>.
        </p>
        `;
  }
}
