import { Popup } from "./Popup.js";

export class PopupDeleting extends Popup {
  constructor(PopupSelector, buttonDeliteСonfirmation, cardDelete) {
    super(PopupSelector);
    this._buttonDeliteСonfirmation = buttonDeliteСonfirmation;
    this._cardDelete = cardDelete;
  }

  open(fubctionApi) {
    this._fubctionApi = fubctionApi;

    super.open();
  }

  setEventListeners() {
    this._buttonDeliteСonfirmation.addEventListener("mousedown", () => {
      this._fubctionApi();
    });

    super.setEventListeners();
  }
}
