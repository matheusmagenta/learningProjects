import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Settings");
  }

  // async because it can be loaded from server-side
  async getHtml() {
    return `
        <h1>Settings</h1>
        <p> 
            nononono nononono nonononn nonono  
        </p>
        <p> 
            <a href="/posts" data-link>View recent posts</a>.
        </p>
        `;
  }
}
