class Section {
    constructor({items, renderer}, templateSelector){
        this._items = items;
        this._renderer = renderer;
        this._templateSelector = document.querySelector(templateSelector);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._templateSelector.prepend(element)
    }
}

export default Section;