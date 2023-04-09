const editingButton = document.querySelector(".profile__edit-button");
const popupUserInfo = document.querySelector(".popup__user-info");
const popupCloseButton = popupUserInfo.querySelector(".popup__close");
const popupInputName = popupUserInfo.querySelector(".popup__input_type_name");
const popupInputJob = popupUserInfo.querySelector(".popup__input_type_job");
const popupUserInfoForm = popupUserInfo.querySelector(".popup__form");
const popupProfileName = document.querySelector(".profile__name");
const popupProfileJob = document.querySelector(".profile__job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const popupOpened = (popup) => {
    popup.classList.add("popup_opened");
};

const popupClose = (popup) => {
    popup.classList.remove("popup_opened");
};

function openUserInfoPopup() {
    popupOpened(popupUserInfo);
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
};

editingButton.addEventListener('click',openUserInfoPopup);
popupCloseButton.addEventListener('click', () => popupClose(popupUserInfo));

function submitUserInfo (event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    popupClose(popupUserInfo);
};

popupUserInfoForm.addEventListener('submit', submitUserInfo);

const addNewImageButton = document.querySelector(".profile__add-button");
const addNewImagePopup = document.querySelector(".popup__add-img");
const popupAddImgCloseButton = addNewImagePopup.querySelector(".popup__close");

addNewImageButton.addEventListener('click', () => popupOpened(addNewImagePopup));
popupAddImgCloseButton.addEventListener('click', () => popupClose(addNewImagePopup));











