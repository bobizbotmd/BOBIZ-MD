const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const WebP = require('node-webpmux')

/*
    Js
*/

const { getRandom } = require('./functions')

const imageToWebp = (media) => {
    var nameWebp = getRandom('.webp')
    return new Promise((resolve, reject) => {
        ffmpeg(media)
            .on('error', (e) => {
            fs.unlinkSync(media)
            reject(e)
        })
            .on('end', async() => {
            fs.unlinkSync(media)
            resolve(fs.readFileSync(nameWebp))
            fs.unlinkSync(nameWebp)
        })
            .addOutputOptions([
            "-vcodec",
            "libwebp",
            "-vf",
            "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
        ])
            .toFormat('webp')
            .save(nameWebp)
    })
}

const videoToWebp = (media) => {
    var nameWebp = getRandom('.webp')
    return new Promise((resolve, reject) => {
        ffmpeg(media)
            .on('error', (e) => {
            fs.unlinkSync(media)
            reject(e)
        })
            .on('end', () => {
            fs.unlinkSync(media)
            resolve(fs.readFileSync(nameWebp))
            fs.unlinkSync(nameWebp)
        })
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:05",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat('webp')
            .save(nameWebp)
    })
}

const writeExif = async(media, metadata) => {
    var nameWebp = getRandom('.webp')
    return new Promise(async(resolve, reject) => {
        let img = new WebP.Image()
        var json = {
            'sticker-pack-id': 'https://github.com/sanuwaofficial',
            'sticker-pack-name': metadata ? metadata.packname : '🥽A░Q░U░A░🥽',
            'sticker-pack-publisher': metadata ? metadata.author : '',
            'emojis': ['']
        }
        var exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        var jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8')
        var exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(media)
        img.exif = exif
        await img.save(nameWebp)
        resolve(fs.readFileSync(nameWebp))
        await fs.unlinkSync(nameWebp)
    })
}

module.exports = { imageToWebp, videoToWebp, writeExif }
