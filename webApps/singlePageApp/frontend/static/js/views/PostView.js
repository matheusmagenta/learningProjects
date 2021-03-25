import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing Post");
  }

  // async because it can be loaded from server-side
  async getHtml() {
    console.log("this.params.id: ", this.params.id);
    return `
        <h1>Posts</h1>
        <p> 
            <a href="/posts" data-link>View recent posts</a>.
        </p>
        `;
  }
}
