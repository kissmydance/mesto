import '../pages/index.css';
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
    formAddNewImg,
    popupOpenImg
} from '../utils/const.js';
import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import validationConfig from '../utils/validationConfig.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

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
    const currentUserInfo = userInfo.getUserInfo();
    popupInputName.value = currentUserInfo.name;
    popupInputJob.value = currentUserInfo.job;
});

const renderCardList = new Section({ items: initialCards, renderer: renderCard }, ".container__content-list");
renderCardList.renderItems();

function createCardElement(item) {
    const card = new Card(item, ".template-img", () => { popupOpenImage.open(item) })
    return card.createCard();
}

function renderCard(item) {
    const cardElement = createCardElement(item);
    renderCardList.addItem(cardElement);

}

const popupUserInfoFormValidation = new FormValidator(validationConfig, popupUserInfoForm);
const addNewImgFormValidation = new FormValidator(validationConfig, formAddNewImg);
popupUserInfoFormValidation.enableValidation();
addNewImgFormValidation.enableValidation();