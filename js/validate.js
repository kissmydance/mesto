const enableValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error'
  }; 

  function enableValidation(enableValidationConfig) {
    const forms = Array.from(document.querySelectorAll(enableValidationConfig.formSelector));
    forms.forEach(form => {
        getInputEvent(form, enableValidationConfig)
    })
}

function checkInputValidation(input, enableValidationConfig) {
    const errorElementPopup = document.querySelector(`#error-${input.id}`)
    if (input.checkValidity()) {
        input.classList.remove(enableValidationConfig.inputErrorClass);
        errorElementPopup.classList.remove(enableValidationConfig.errorClass);
        errorElementPopup.textContent = '';
    }
    else {
        input.classList.add(enableValidationConfig.inputErrorClass);
        errorElementPopup.textContent = input.validationMessage;
        errorElementPopup.classList.add(enableValidationConfig.errorClass);
    }
}

function disableButton(button, enableValidationConfig) {
    button.setAttribute('disabled', '');
    button.classList.add(enableValidationConfig.inactiveButtonClass)
};

function enableButton(button, enableValidationConfig) {
    button.removeAttribute('disabled');
    button.classList.remove(enableValidationConfig.inactiveButtonClass)

};

function toggleButtonValidity(form, enableValidationConfig) {
    const submitButton = form.querySelector(enableValidationConfig.submitButtonSelector);
    if (form.checkValidity()) {
        enableButton(submitButton, enableValidationConfig);
    } else {
        disableButton(submitButton, enableValidationConfig);
    }
}

function getInputEvent(form, enableValidationConfig) {
const inputs = Array.from(form.querySelectorAll(enableValidationConfig.inputSelector));

inputs.forEach((input) => {
    input.addEventListener('input', () => {
        checkInputValidation(input, enableValidationConfig);
        toggleButtonValidity(form, enableValidationConfig);
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
});
};

enableValidation(enableValidationConfig);