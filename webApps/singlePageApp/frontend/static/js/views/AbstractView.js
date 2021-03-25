export default class {
  constructor(params) {
    this.params = params;
    console.log("this.params: ", this.params);
  }

  setTitle(title) {
    document.title = title;
  }
  // this method will be overried by other views
  async getHtml() {
    return "";
  }
}
