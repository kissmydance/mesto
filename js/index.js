import FormValidator from "./FormValidator";
import validationConfig from "./ValidationConfig";
import initialCards from "./initialCards";
import Card from "./Card";
const popups = document.querySelectorAll(".popup");
const editingButton = document.querySelector(".profile__edit-button");
const popupUserInfo = document.querySelector(".popup_type_user-info");
const popupInputName = popupUserInfo.querySelector(".popup__input_type_name");
const popupInputJob = popupUserInfo.querySelector(".popup__input_type_job");
const popupUserInfoForm = popupUserInfo.querySelector(".popup__form");
const popupProfileName = document.querySelector(".profile__name");
const popupProfileJob = document.querySelector(".profile__job");
const addNewImagePopup = document.querySelector(".popup_type_add-img");
const addNewImageButton = document.querySelector(".profile__add-button");
const addNewImgForm = addNewImagePopup.querySelector(".popup__form");
const cardGrid = document.querySelector(".container__content-list");
const popupOpenImg = document.querySelector(".popup_open-img");
const popupOpenImgPicture = popupOpenImg.querySelector(".popup__img");
const popupOpenImgTitle = popupOpenImg.querySelector(".popup__title-img");
const nameInput = addNewImgForm.querySelector(".popup__input_type_title");
const imgInput = addNewImgForm.querySelector(".popup__input_type_link-img");

const openPopup = (popup) => {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupEscape);
};

const closePopup = (popup) => { 
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupEscape);
};

function openUserInfoPopup() {
    openPopup(popupUserInfo);
    popupInputName.value = popupProfileName.textContent;
    popupInputJob.value = popupProfileJob.textContent;
};

function submitUserInfo(event) {
    event.preventDefault();
    popupProfileName.textContent = popupInputName.value;
    popupProfileJob.textContent = popupInputJob.value;
    closePopup(popupUserInfo);
};

function renderCardElement(item, cardGrid) {
    const card = new Card(item, ".template-img", openImgPopup);
    const cardElement = card.createCard();
    cardGrid.append(cardElement);
};

function getItemFromArray (array, cardGrid) {
    array.forEach((item) => {
        renderCardElement(item, cardGrid);
    });
}

getItemFromArray(initialCards, cardGrid);

const submitAddNewImg = (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const link = imgInput.value;
    const newImg = {
        name,
        link,
    };
    addNewImgForm.reset();
    renderNewCardElement(createCardElement(newImg));
    closePopup(addNewImagePopup);
};

function openImgPopup (item) {
    popupOpenImgPicture.src = cardData.link;
    popupOpenImgTitle.textContent = cardData.name;
    popupOpenImgPicture.alt = cardData.name;
    openPopup(popupOpenImg);
};

const closePopupEscape = function (event) {
    if (event.key === 'Escape') {
        const selectPopup = document.querySelector('.popup_opened');
        closePopup(selectPopup);
    }
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})
const popupUserInfoFormValidation = new FormValidator(validationConfig, popupUserInfoForm);
const addNewImgFormValidation = new FormValidator(validationConfig, addNewImgForm);
popupUserInfoFormValidation.enableValidation();
addNewImgFormValidation.enableValidation();
editingButton.addEventListener('click', openUserInfoPopup);
popupUserInfoForm.addEventListener('submit', submitUserInfo);
addNewImageButton.addEventListener('click', () => {
    openPopup(addNewImagePopup);
 });
addNewImgForm.addEventListener('submit', submitAddNewImg);

