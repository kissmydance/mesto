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
const addNewImagePopup = document.querySelector(".popup__add-img");
const popupAddImgCloseButton = addNewImagePopup.querySelector(".popup__close");
const addNewImageButton = document.querySelector(".profile__add-button");
const AddNewImgForm = addNewImagePopup.querySelector(".popup__form");
const templateImg = document.querySelector(".template-img");
const cardGrid = document.querySelector(".container__content-list");

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

editingButton.addEventListener('click', openUserInfoPopup);
popupCloseButton.addEventListener('click', () => popupClose(popupUserInfo));

function submitUserInfo(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    popupClose(popupUserInfo);
};

popupUserInfoForm.addEventListener('submit', submitUserInfo);


addNewImageButton.addEventListener('click', () => popupOpened(addNewImagePopup));
popupAddImgCloseButton.addEventListener('click', () => popupClose(addNewImagePopup));


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

    return cardElement;
};

const renderCardElement = (cardElement) => {
    cardGrid.prepend(cardElement);
};

initialCards.forEach((card) => {
    renderCardElement(createCardElement(card))
});

const submitAddNewImg = (event) => {
    event.preventDefault();

    const nameInput = AddNewImgForm.querySelector(".popup__input_type_title");
    const imgInput = AddNewImgForm.querySelector(".popup__input_type_link-img");

    const name = nameInput.value;
    const link = imgInput.value;

    const newImg = {
        name,
        link,
    };
    renderCardElement(createCardElement(newImg));

};

AddNewImgForm.addEventListener('submit', submitAddNewImg);
AddNewImgForm.addEventListener('submit', () => popupClose(addNewImagePopup));













