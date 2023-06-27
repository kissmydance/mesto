class Card {
  constructor(data, templateSelector, openImage) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  }

  createCard() {
    this._createCardElement();
    this._insertCardContent();
    this._setEventListeners();
    return this._cardElement;
  }

  _createCardElement() {
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.container__content').cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.container__button-like');
    this._deleteButton = this._cardElement.querySelector('.container__delete-button');
    this._cardName = this._cardElement.querySelector('.container__title');
    this._cardImg = this._cardElement.querySelector('.container__img');
    return this._cardElement;
  }

  _insertCardContent() {
    this._cardName.textContent = this._data.name;
    this._cardImg.src = this._data.link;
    this._cardImg.alt = this._data.name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handlelike());
    this._deleteButton.addEventListener('click', () => this._handleDelete());
    this._cardImg.addEventListener('click', () => this._openImagePopup());
  }

  _handlelike() {
    this._likeButton.classList.toggle('container__button-img_type_active');
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _openImagePopup() {
    this._openImage(this._data)
  }
}

export default Card;