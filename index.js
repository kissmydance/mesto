const editingButton = document.querySelector(".profile__edit-button");
const popupOpened = document.querySelector(".popup");
const popupCloseButton = popupOpened.querySelector(".popup__close");
const popupInputName = popupOpened.querySelector(".popup__input_type_name");
const popupInputJob = popupOpened.querySelector(".popup__input_type_job");
const popupForm = popupOpened.querySelector(".popup__form");
const popupProfileName = document.querySelector(".profile__name");
const popupProfileJob = document.querySelector(".profile__job");



editingButton.addEventListener('click', () => {
    popupOpened.classList.add("popup_opened");
    popupInputName.value = popupProfileName.textContent;
    popupInputJob.value =  popupProfileJob.textContent;
});

popupCloseButton.addEventListener('click', () => {
    popupOpened.classList.remove("popup_opened");
});



popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    popupProfileName.textContent = popupInputName.value;
    popupProfileJob.textContent = popupInputJob.value;
    popupOpened.classList.remove("popup_opened");

});