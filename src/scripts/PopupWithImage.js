import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._Image = this._popupSelector.querySelector('.popup__img');
        this._ImageTitle = this._popupSelector.querySelector('.popup__title-img');
    }
    open(items) {
        this._Image.src = items.link;
        this._ImageTitle.textContent = items.name;
        this._Image.alt = items.name;
        super.open();

    }
}

export default PopupWithImage;