const css = require('./averto.css').toString()

export default () => {
    const avertoContainer = document.createElement('div');
    avertoContainer.innerHTML =
`<div class="averto-box">
    <div class="averto-gradient">
        <span class="averto-title"></span>
        <span class="averto-message"></span>
    </div>
</div>`
    avertoContainer.className = 'averto'
    const style = document.createElement('style')
    style.innerHTML = css
    avertoContainer.appendChild(style)
    return {
        container: avertoContainer,
        box: avertoContainer.querySelector('.averto-box'),
        title: avertoContainer.querySelector('.averto-title'),
        message: avertoContainer.querySelector('.averto-message')
    }
}