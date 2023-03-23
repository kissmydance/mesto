const editingButton = document.querySelector(".profile__edit-button");
const popupOpen = document.querySelector(".popup");
const popupCloseButton = popupOpen.querySelector(".popup__close");
const popupInputName = popupOpen.querySelector(".popup__input_type_name");
const popupInputJob = popupOpen.querySelector(".popup__input_type_job");
const popupSubmitButton = popupOpen.querySelector(".popup__form_button");
const popupForm = popupOpen.querySelector(".popup__form");
const popupProfileName = document.querySelector(".profile__name");
const popupProfileJob = document.querySelector(".profile__job");



editingButton.addEventListener('click', () => {
    popupOpen.classList.add("popup__opened");
    popupInputName.value = popupProfileName.textContent;
    popupInputJob.value =  popupProfileJob.textContent;
});

popupCloseButton.addEventListener('click', () => {
    popupOpen.classList.remove("popup__opened");
});



popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    popupProfileName.textContent = popupInputName.value;
    popupProfileJob.textContent = popupInputJob.value;
    popupOpen.classList.remove("popup__opened");

});