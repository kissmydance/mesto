import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupElement, submitCallbackFunction) {
        super(popupElement);
        this._form = this._popupElement.querySelector('.popup__form');
        this._submitCallbackFunction = submitCallbackFunction;
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._form.querySelector('.popup__form-button');
    }

    _getInputValues() {
        const inputValues = {};
        this._inputs.forEach((input) => {
            inputValues[input.name] = input.value
        });
            return inputValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event)=> {
            event.preventDefault();
            this._submitButton.textContent = "Сохранение..."
            this._submitCallbackFunction(this._getInputValues());
        });

    };

    setDefaultButtonText() {
        this._submitButton.textContent = this._buttonDefaultValue;
    }

    close() {
        super.close();
        this._form.reset();
    };
}

export default PopupWithForm;