class Card {
  constructor(data, templateSelector, handleCardClick, handleConfirmPopupOpen, likeSet, user) {
    this._data = data;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmPopupOpen = handleConfirmPopupOpen;
    this._likeSet = likeSet;
    this._user = user;
  }

  createCard() {
    this._createCardElement();
    this._insertCardContent();
    this._setEventListeners();
    this._giveBasketButton();
    this._checkLikeStatus();
    return this._cardElement;
  }

  _createCardElement() {
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.container__content').cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.container__like-img');
    this._deleteButton = this._cardElement.querySelector('.container__delete-button');
    this._cardName = this._cardElement.querySelector('.container__title');
    this._cardImg = this._cardElement.querySelector('.container__img');
    this._likeBox = this._cardElement.querySelector('.container__like-box');
    return this._cardElement;
  }

  _insertCardContent() {
    this._cardName.textContent = this._data.name;
    this._cardImg.src = this._data.link;
    this._cardImg.alt = this._data.name;
  }

  isLiked() {
    const myLike = this._likes.find((like) => {
      return like._id === this._user;
    })
    return myLike
  };

  _checkLikeStatus() {
    this._likes.forEach(item => {
      if (item._id === this._user) {
        this._likeButton.classList.add('container__button-img_type_active');
        return
      }
    })
    this._likeBox.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeButtonClick());
    this._deleteButton.addEventListener('click', () => this._handleConfirmPopupOpen({ card: this, cardId: this._data._id }));
    this._cardImg.addEventListener('click', () => this._handleCardClick());
  }

  _handleLikeButtonClick() {
    this._likeSet(this._data._id);
  };

  toggleButtonLike(likes) {
    this._likeBox.textContent = likes.length;
    this._likeButton.classList.toggle('container__button-img_type_active');
  }

  _giveBasketButton() {
    if (this._user === this._data.owner._id) {
      this._deleteButton.classList.add('container__delete-button-img_type_visible');
    }
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

}

export default Card;