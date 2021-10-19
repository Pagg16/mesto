export class Section {
    constructor( renderer, selector) {
    this._renderer = renderer;

    this._container = document.querySelector(selector);

  }

  renderItems(item) {
    item.forEach((items) => {
      this._renderer(items);
    });
}

  addItem(element) {
    this._container.prepend(element);
  }
}
