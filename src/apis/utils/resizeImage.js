import fs from 'fs'
import sharp from 'sharp'

// fit: "cover" | "contain" | "fill" | "inside" | "outside"
export const resizeImage = (path, format, width, height, fit = "contain") => {
    const readStream = fs.createReadStream(path)
    let transform = sharp()
    if (format) {
        transform = transform.toFormat(format)
    }
    if (width || height) {
        transform = transform.resize(width, height, {
            background: "#fff",
            fit
        }).flatten({ background: '#ffffff' })
    }
    return readStream.pipe(transform)
}

export const getFileExtension = (slug) => {
    return slug.slice(slug.lastIndexOf(".") + 1)
}
