class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closeButton = this._popupElement.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    } 
    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        };
    }
    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }
}

export default Popup;