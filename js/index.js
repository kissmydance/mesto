const popups = document.querySelectorAll(".popup");
const editingButton = document.querySelector(".profile__edit-button");
const popupUserInfo = document.querySelector(".popup_type_user-info");
const popupCloseButton = popupUserInfo.querySelector(".popup__close");
const popupInputName = popupUserInfo.querySelector(".popup__input_type_name");
const popupInputJob = popupUserInfo.querySelector(".popup__input_type_job");
const popupUserInfoForm = popupUserInfo.querySelector(".popup__form");
const popupProfileName = document.querySelector(".profile__name");
const popupProfileJob = document.querySelector(".profile__job");
const addNewImagePopup = document.querySelector(".popup_type_add-img");
const popupAddImgCloseButton = addNewImagePopup.querySelector(".popup__close");
const addNewImageButton = document.querySelector(".profile__add-button");
const addNewImgForm = addNewImagePopup.querySelector(".popup__form");
const templateImg = document.querySelector(".template-img");
const cardGrid = document.querySelector(".container__content-list");
const popupOpenImg = document.querySelector(".popup_open-img");
const popupOpenImgPicture = popupOpenImg.querySelector(".popup__img");
const popupOpenImgTitle = popupOpenImg.querySelector(".popup__title-img");
const popupOpenImgCloseButton = popupOpenImg.querySelector(".popup__close");
const popupFormButton = addNewImagePopup.querySelector('.popup__form-button');

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

const createCardElement = (cardData) => {
    const cardElement = templateImg.content.querySelector(".container__content").cloneNode(true);
    const cardName = cardElement.querySelector(".container__title");
    const cardImg = cardElement.querySelector(".container__img");

    cardName.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;

    const deleteButton = cardElement.querySelector(".container__delete-button");
    const likeButton = cardElement.querySelector(".container__button-like");

    const handleDelete = () => {
      cardElement.remove();
    };

    const handlelike = () => {
        likeButton.classList.toggle("container__button-img_type_active");
    };

    deleteButton.addEventListener('click', handleDelete);
    likeButton.addEventListener('click', handlelike);
    cardImg.addEventListener('click', () => openImgPopup(cardData));

    return cardElement;
};
const renderCardElement = (cardElement) => {
    cardGrid.append(cardElement);
};

const renderNewCardElement = (cardElement) => {
cardGrid.prepend(cardElement)
};

initialCards.forEach((card) => {
    renderCardElement(createCardElement(card));
});

const submitAddNewImg = (event) => {
    event.preventDefault();

    const nameInput = addNewImgForm.querySelector(".popup__input_type_title");
    const imgInput = addNewImgForm.querySelector(".popup__input_type_link-img");

    const name = nameInput.value;
    const link = imgInput.value;

    const newImg = {
        name,
        link,
    };
    renderNewCardElement(createCardElement(newImg));
    closePopup(addNewImagePopup);
};

function openImgPopup (cardData) {
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

const closePopupClickOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    } 
    closePopup(event.target);
    }

editingButton.addEventListener('click', openUserInfoPopup);
popupCloseButton.addEventListener('click', () => closePopup(popupUserInfo));
popupUserInfoForm.addEventListener('submit', submitUserInfo);
addNewImageButton.addEventListener('click', () => {
    openPopup(addNewImagePopup);
    popupFormButton.setAttribute('disabled', '');
    popupFormButton.classList.add('popup__form-button_disabled');
});
popupAddImgCloseButton.addEventListener('click', () => closePopup(addNewImagePopup));
addNewImgForm.addEventListener('submit', submitAddNewImg);
addNewImagePopup.addEventListener('click', () => closePopup(popupOpenImg));
popupOpenImg.addEventListener('click', closePopupClickOverlay);
addNewImagePopup.addEventListener('click', closePopupClickOverlay);
popupUserInfo.addEventListener('click', closePopupClickOverlay);