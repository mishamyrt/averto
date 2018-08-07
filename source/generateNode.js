import './averto.css'

export default () => {
    const avertoContainer = document.createElement('div')
    avertoContainer.innerHTML =
        '<div class="averto-box"><div class="averto-gradient"><span class="averto-title"></span><span class="averto-message"></span></div></div>'
    avertoContainer.className = 'averto'
    return {
        container: avertoContainer,
        box: avertoContainer.querySelector('.averto-box'),
        title: avertoContainer.querySelector('.averto-title'),
        message: avertoContainer.querySelector('.averto-message'),
    }
}
