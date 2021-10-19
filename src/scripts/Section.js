export class Section {
  constructor({ items, renderer }, selector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((items) => {
      this._renderer(items);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
