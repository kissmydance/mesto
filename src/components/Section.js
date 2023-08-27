class Section {
    constructor({items, renderer}, contentList) {
        this._items = items;
        this._renderer = renderer;
        this._contentList = document.querySelector(contentList);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._contentList.prepend(element)
    }
}

export default Section;