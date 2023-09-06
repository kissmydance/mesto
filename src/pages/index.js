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
    popupOpenImg,
    avatarImage,
    avatarImageButton,
    popupChangeAvatar,
    inputChangeAvatar,
    popupChangeAvatarForm,
    popupDeleteConfrimation
} from '../utils/const.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import validationConfig from '../utils/validationConfig.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmed from '../components/PopupWithConfirmed.js';

const api = new Api({
    Url: 'https://mesto.nomoreparties.co/v1/cohort-74',
    headers: {
        authorization: '1821b5e2-17d4-4855-b786-25538209f183',
        'Content-type': 'application/json'
    }
});

const userInfo = new UserInfo({ name: popupProfileName, job: popupProfileJob, avatar: avatarImage });

const renderCardList = new Section({ renderer: renderCard }, '.container__content-list');

Promise.all([api.getUser(), api.getCards()])
    .then(([userRes, cardsRes]) => {
        const userId = userRes._id;
        const items = cardsRes.reverse();
        renderCardList.renderItems(items, userId);
        userInfo.setUserInfo({
            name: userRes.name,
            about: userRes.about,
            avatar: userRes.avatar,
            userId: userId,
        });
    })
    .catch((error) =>
        console.error(`Ошибка при загрузке данных с сервера - ${error}`)
    );

const popupOpenImage = new PopupWithImage(popupOpenImg);
popupOpenImage.setEventListeners();

const popupNewImageForm = new PopupWithForm(popupAddCard, handleFormAddNewImage);
popupNewImageForm.setEventListeners();

const popupUserInf = new PopupWithForm(popupUserInfo, handleSubmitSetInfo);
popupUserInf.setEventListeners();

const confirmPopup = new PopupWithConfirmed(popupDeleteConfrimation, handleSubmitConfirmation);
confirmPopup.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(popupChangeAvatar, handleEditAvatar);
popupUpdateAvatar.setEventListeners();

editingButton.addEventListener('click', () => {
    popupUserInf.open();
    popupInputName.value = userInfo.getUserInfo().name;
    popupInputJob.value = userInfo.getUserInfo().about;
});

buttonAddNewImage.addEventListener('click', () => {
    popupNewImageForm.open();
    addNewImgFormValidation.disableButton();
});

avatarImageButton.addEventListener('click', () => {
    inputChangeAvatar.value = userInfo.getUserInfo().avatar;
    popupUpdateAvatar.open();
});

function handleSubmitConfirmation({ card, cardId }) {
    api.deleteCard(cardId).then(() => {
        card.removeCard();
        confirmPopup.close();
    })
    .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
    .finally(() => confirmPopup.setDefaultButtonText())
};

function handleFormAddNewImage(inputValues) {
    api.addCard(inputValues.name, inputValues.link)
    .then((newCard) => {
        renderCard({
            name: newCard.name, _id: newCard._id, link: newCard.link, likes: newCard.likes, owner: { _id: newCard.owner._id }
        }, newCard.owner._id);
        popupAddCard.close();
    })
    .catch((error => console.error(`Ошибка при попытке создать карточку ${error}`)))
    .finally(() => popupNewImageForm.setDefaultButtonText());
};

function handleSubmitSetInfo(inputValues) {
    api.updateProfileInfo(inputValues.name, inputValues.job)
    .then((res) => {
        userInfo.setUserInfo({ name: res.name, about: res.about, avatar: res.avatar });
        popupUserInf.close();
        })
    .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
    .finally(() => popupUserInf.setDefaultButtonText());
};

function handleEditAvatar(inputValues) {
    api.updateAvatar(inputValues.avatar)
        .then((res) => {
        userInfo.setUserInfo({ name: res.name, about: res.about, avatar: res.avatar });
        popupUpdateAvatar.close();
        })
    .catch((error => console.error(`Ошибка смены аватара ${error}`)))
    .finally(() => popupUpdateAvatar.setDefaultButtonText());
};

function createCard(item, user) {
    const card = new Card(
        item,
        ".template-img",
        () => { popupOpenImage.open(item) },
        confirmPopup.open,
        (cardId) => {
            let itLiked = card.isLiked();
            if (itLiked) {
                api.deleteLike(cardId).then((res) => card.toggleButtonLike(res.likes))
                .catch((error) => console.error(`Ошибка снятия лайка ${error}`))
            } else {
            api.addLike(cardId).then((res) => card.toggleButtonLike(res.likes))
            .catch((error) => console.error(`Ошибка попытки поставить лайк ${error}`));
            }
        },
        user
    );
    return card.createCard();
};

function renderCard (item, user) {
    const cardElement = createCard(item, user);
    renderCardList.addItem(cardElement);
}
const avatarFormValidation = new FormValidator(validationConfig, popupChangeAvatarForm);
const popupUserInfoFormValidation = new FormValidator(validationConfig, popupUserInfoForm);
const addNewImgFormValidation = new FormValidator(validationConfig, formAddNewImg);
popupUserInfoFormValidation.enableValidation();
addNewImgFormValidation.enableValidation();
avatarFormValidation.enableValidation();