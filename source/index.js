import generateNode from './generateNode'
import {
    contrastLevel,
    generateBoxShadow,
    hexToRGB,
} from './color'

const VISIBLE_CLASS = 'is__visible'
const BLOCKING_CLASS = 'is__blocking'

const block = generateNode()


export default class Averto {
    static initite() {
        this.container = block.container
        this.box = block.box
        this.title = block.title
        this.message = block.message
        this.visible = false
        document.body.appendChild(this.container)
        window.addEventListener('keydown', (e) => {
            this._keyDown(e)
        }, true)
        this.box.onclick = () => {
            this._hide()
        }
    }

    static _keyDown(e) {
        if ((e.keyCode === 13 ||
                e.keyCode === 27) && this.visible) {
            e.preventDefault()
            this._hide()
        }
    }
    static _applyParameters(parameters) {
        const rgb = hexToRGB(parameters.color)
        this.title.innerText = parameters.title
        this.message.innerText = parameters.message
        this.box.style.boxShadow = generateBoxShadow(rgb)
        this.box.style.backgroundColor = parameters.color
        this.container.style.backgroundColor = parameters.debug.background
        this.box.style.color = contrastLevel(rgb) > 135 ? '#000' : '#FFF'
        this._setModal(parameters.blocking)
    }

    static _setModal(isModal) {
        this.blocking = isModal
        this.container.classList.toggle(BLOCKING_CLASS, isModal)
    }

    static _parseParameters(rawParameters) {
        const parameters = {
            timeout: 3000,
            autohide: true,
            color: '#F31D2F',
            title: '',
            debug: {
                background: 'transparent',
            },
            message: '',
            blocking: false,
        }
        for (const key in rawParameters) {
            parameters[key] = rawParameters[key]
        }
        return Object.freeze(parameters)
    }

    static _hide() {
        requestAnimationFrame(() => {
            clearTimeout(this.waiter)
            this._setModal(false)
            this.container.style.backgroundColor = ''
            this.container.classList.remove(VISIBLE_CLASS)
            this.visible = false
        })
    }

    static show(rawParameters) {
        const parameters = this._parseParameters(rawParameters)
        this._applyParameters(parameters)
        requestAnimationFrame(() => {
            this.container.classList.add(VISIBLE_CLASS)
            this.visible = true
            if (parameters.autohide) {
                this.waiter = setTimeout(() => {
                    this._hide()
                }, parameters.timeout)
            }
        })
    }
}
