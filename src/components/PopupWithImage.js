import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._image = this._popupElement.querySelector('.popup__img');
        this._imageTitle = this._popupElement.querySelector('.popup__title-img');
    }
    open(items) {
        this._image.src = items.link;
        this._imageTitle.textContent = items.name;
        this._image.alt = items.name;
        super.open();

    }
}

export default PopupWithImage;