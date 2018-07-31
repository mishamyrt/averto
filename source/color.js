export const hexToRGB = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ?
        {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } :
        null
}

export const contrastLevel = (rgb) => Math.round(
    (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
)

export const generateBoxShadow = (rgb) =>
    `0px 12px 85px 0px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, .61)`
