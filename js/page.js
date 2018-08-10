const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('DOMContentLoaded', () => {
    const codeBlock = document.querySelector('.language-js')
    const booleans = codeBlock.querySelectorAll('.boolean')
    const strings = codeBlock.querySelectorAll('.string')
    const timeoutValue = codeBlock.querySelector('.number')
    const autohideValue = booleans[0]
    const modalValue = booleans[1]
    const colorValue = strings[0]
    const titleValue = strings[1]
    const messageValue = strings[2]

    const button = document.querySelector('.form-button')
    const titleInput = document.querySelector('.form-input.__title')
    const messageInput = document.querySelector('.form-input.__message')
    const colorInput = document.querySelector('.form-input.__colorText')
    const timeoutInput = document.querySelector('.form-input.__timeout')
    const autohideInput = document.querySelector('.form-check.__autohide')
    const modalInput = document.querySelector('.form-check.__modal')
    const color = document.querySelector('.form-color');
    const colorSelector = document.querySelector('.form-color-pseudo')
    const randomColor = document.querySelector('.form-color-random');

    const str = (string) => `'${string}'`

    randomColor.onclick = (e) => {
        e.preventDefault()
        const gcolor = getRandomColor()
        colorInput.value = gcolor
        colorValue.innerText = gcolor
        colorSelector.value = gcolor
        color.style.backgroundColor = gcolor
    }

    const updateValues = (node) => {
        timeoutValue.innerText = timeoutInput.value
        titleValue.innerText =  str(titleInput.value)
        messageValue.innerText = str(messageInput.value)
        autohideValue.innerText = autohideInput.checked
        modalValue.innerText = modalInput.checked
        if (node.className === 'form-color-pseudo') {
            color.style.backgroundColor = colorSelector.value
            colorInput.value = colorSelector.value
            colorValue.innerText = str(colorSelector.value)
        } else {
            color.style.backgroundColor = colorInput.value
            colorSelector.value = colorInput.value
        }
    }

    button.onclick = (e) => {
        e.preventDefault();
        Averto.show({
            title: titleInput.value,
            message: messageInput.value,
            color: colorInput.value,
            timeout: timeoutInput.value,
            autohide: autohideInput.checked,
            blocking: modalInput.checked,
        })
    }
    color.onclick = () => {
        colorSelector.click()
    }
    colorSelector.onchange = () => {
        color.style.backgroundColor = colorSelector.value
        colorInput.value = colorSelector.value
    }
    [titleInput, timeoutInput, autohideInput, colorInput, colorSelector, messageInput, modalInput].forEach(node => {
        node.onchange = () => updateValues(node)
        node.onkeyup = () => updateValues(node)
    })
});
