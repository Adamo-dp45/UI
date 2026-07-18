class Slider {

    constructor(el) {
        this.nextButton = el.querySelector('[data-slider-next]')
        this.prevButton = el.querySelector('[data-slider-prev]')
        this.wrapper = el.querySelector('[data-slider-wrapper]')
        this.nextButton.addEventListener('click', () => this.move(1))
        this.prevButton.addEventListener('click', () => this.move(-1))
        this.wrapper.addEventListener('scrollend', () => this.updateUI())
        this.updateUI()
    }

    get itemToScroll() {
        return parseInt(window.getComputedStyle(this.wrapper).getPropertyValue('--items'), 10) // Permet de récupérer la valeur dans le css
    }

    get pages() {
        return Math.ceil(this.wrapper.children.length / this.itemToScroll)
    }

    get page() {
        return Math.ceil(this.wrapper.scrollLeft / this.wrapper.offsetWidth)
    }

    updateUI() {
        console.log(
            this.pages,
            this.page
        )
        if(this.page === 0) {
            this.prevButton.setAttribute('hidden', 'hidden')
        } else {
            this.prevButton.removeAttribute('hidden')
        }
        if(this.page === this.pages - 1) {
            this.nextButton.setAttribute('hidden', 'hidden')
        } else {
            this.nextButton.removeAttribute('hidden')
        }
    }

    /**
     * Permet de déplacer le carousel de n pages
     * @param {number} n
     */
    move(n) {
        let newPage = this.page + n
        if(newPage < 0) {
            newPage = 0;
        }
        if(newPage >= this.pages) {
            newPage = this.pages - 1
        }

        this.wrapper.scrollTo({
            left: this.wrapper.children[newPage * this.itemToScroll].offsetLeft,
            behavior: 'smooth'
        })
        console.log(
            this.pages,
            this.page
        )
    }

}

new Slider(document.querySelector('[data-slider]'))