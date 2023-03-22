const moreInfoLink = document.querySelector(".profile__edit-button");
const moreInfoPopup = document.querySelector(".popup");
const moreInfoPopupCloseButton = moreInfoPopup.querySelector(".popup__close");
const popupInputName = moreInfoPopup.querySelector(".popup__input_type_name");
const popupInputJob = moreInfoPopup.querySelector(".popup__input_type_job");
const popupSubmitButton = moreInfoPopup.querySelector(".popup__form-button");
const popupForm = moreInfoPopup.querySelector(".popup__form");
const popupProfileName = document.querySelector(".profile__name");
const popupProfileJob = document.querySelector(".profile__job");



moreInfoLink.addEventListener('click', () => {
    moreInfoPopup.classList.add("popup__open");
    popupInputName.value = popupProfileName.innerHTML;
    popupInputJob.value =  popupProfileJob.innerHTML;
});

moreInfoPopupCloseButton.addEventListener('click', () => {
    moreInfoPopup.classList.remove("popup__open");
});



popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    popupProfileName.innerHTML = popupInputName.value;
    moreInfoPopup.classList.remove("popup__open");
    popupProfileJob.innerHTML = popupInputJob.value;
    moreInfoPopup.classList.remove("popup__open");

});