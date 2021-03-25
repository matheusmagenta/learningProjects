export default class {
  constructor() {}

  setTitle(title) {
    document.title = title;
  }
  // this method will be overried by other views
  async getHtml() {
    return "";
  }
}
