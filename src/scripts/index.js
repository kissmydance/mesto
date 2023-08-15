import {
    editingButton,
    popupUserInfo,
    popupInputName,
    popupInputJob,
    popupUserInfoForm,
    popupProfileName,
    popupProfileJob,
    popupAddCard,
    buttonAddNewImage,
    addNewImgForm,
    popupOpenImg
} from './const.js';
import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import validationConfig from './validationConfig.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

const popupOpenImage = new PopupWithImage(popupOpenImg);
popupOpenImage.setEventListeners();

const userInfo = new UserInfo(popupProfileName, popupProfileJob);
const userInfoPopup = new PopupWithForm(popupUserInfo, (inputValues) => {
    userInfo.setUserInfo(inputValues)
});
userInfoPopup.setEventListeners();

const popupNewImageForm = new PopupWithForm(popupAddCard, (inputValues) => {
    renderCard({ name: inputValues.name, link: inputValues.link });
    popupNewImageForm.close();
});
popupNewImageForm.setEventListeners();

buttonAddNewImage.addEventListener('click', () => {
    popupNewImageForm.open();
    addNewImgFormValidation.disableButton();
});

editingButton.addEventListener('click', () => {
    userInfoPopup.open();
    popupInputName.value = userInfo.getUserInfo().name;
    popupInputJob.value = userInfo.getUserInfo().job;
});

const renderCardList = new Section({ items: initialCards, renderer: renderCard }, ".container__content-list");
renderCardList.render();

function createCardElement(item) {
    const card = new Card(item, ".template-img", () => { popupOpenImage.open(item) })
    return card.createCard();
}

function renderCard(item) {
    const cardElement = createCardElement(item);
    renderCardList.addItem(cardElement);

}

const popupUserInfoFormValidation = new FormValidator(validationConfig, popupUserInfoForm);
const addNewImgFormValidation = new FormValidator(validationConfig, addNewImgForm);
popupUserInfoFormValidation.enableValidation();
addNewImgFormValidation.enableValidation();