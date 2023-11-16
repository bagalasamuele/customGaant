// js/rectangles.js

class Rectangles {
    constructor(...rectangleIds) {
        this.rectangles = {};

        rectangleIds.forEach((id) => {
            const rectangleElement = document.getElementById(id);
            this.rectangles[id] = {
                element: rectangleElement,
                isDragging: false,
                offsetX: 0,
                offsetY: 0
            };

            rectangleElement.addEventListener('mousedown', (e) => this.startDragging(id, e));
        });

        document.addEventListener('mouseup', this.stopDragging.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
    }

    startDragging(id, e) {
        this.rectangles[id].isDragging = true;
        this.rectangles[id].offsetX = e.clientX - this.rectangles[id].element.getBoundingClientRect().left;
        this.rectangles[id].offsetY = e.clientY - this.rectangles[id].element.getBoundingClientRect().top;
    }

    stopDragging() {
        for (const id in this.rectangles) {
            const rectangle = this.rectangles[id];
            if (rectangle.isDragging) {
                rectangle.isDragging = false;

                const xOffset = this.rectangles[Object.keys(this.rectangles)[0]].element.offsetLeft - this.rectangles[Object.keys(this.rectangles)[0]].element.getBoundingClientRect().left;
                const yOffset = this.rectangles[Object.keys(this.rectangles)[0]].element.offsetTop - this.rectangles[Object.keys(this.rectangles)[0]].element.getBoundingClientRect().top;

                for (const otherId in this.rectangles) {
                    if (otherId !== id) {
                        const otherRectangle = this.rectangles[otherId];
                        otherRectangle.element.style.left = (rectangle.element.offsetLeft + xOffset) + 'px';
                        otherRectangle.element.style.top = (rectangle.element.offsetTop + yOffset) + 'px';
                    }
                }
            }
        }
    }

    drag(e) {
        for (const id in this.rectangles) {
            const rectangle = this.rectangles[id];
            if (rectangle.isDragging) {
                const x = e.clientX - rectangle.offsetX;
                const y = e.clientY - rectangle.offsetY;

                rectangle.element.style.left = x + 'px';
                rectangle.element.style.top = y + 'px';
            }
        }
    }
}

customElements.define('my-rectangle', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                    width: 50px;
                    height: 50px;
                    background-color: blue;
                }
            </style>
            <div id="rectangle" class="rectangle"></div>
        `;
    }
});

// Creiamo un oggetto "Rectangles" e inizializziamo i rettangoli
const rectangles = new Rectangles('rectangle1', 'rectangle2', 'rectangle3');
