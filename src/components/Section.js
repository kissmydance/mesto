class Section {
    constructor({renderer}, contentList) {
        this._renderer = renderer;
        this._contentList = document.querySelector(contentList);
    }

    renderItems(items, userId) {
        items.forEach((item) => {
            this._renderer(item, userId);
        });
    }
    addItem(element) {
        this._contentList.prepend(element)
    }
}

export default Section;