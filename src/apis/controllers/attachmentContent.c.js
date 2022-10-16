import * as fs from 'fs';
import createError from 'http-errors';
import catchAsync from '../utils/catch-async';
import { resizeImage } from '../utils/resizeImage';

const getImageContent = catchAsync(async (req, res) => {

    const { path: filePath, filename, fileExtension } = req.attachment;
    const { width: widthStr, height: heightStr, fit } = req.query;
    let width, height;
    if (widthStr) {
        width = parseInt(widthStr.toString());
    }
    if (heightStr) {
        height = parseInt(heightStr.toString());
    }
    if (!fs.existsSync(filePath))
        throw createError.NotFound('filePath not found')

    res.setHeader('content-disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', `image/${fileExtension}`);
    const readStream = resizeImage(filePath, fileExtension, width, height, fit);
    readStream.pipe(res);
});

const getVideoContent = catchAsync(async (req, res) => {
    const { path: filePath, fileExtension } = req.attachment;
    fs.stat(filePath, (err, stat) => {
        const videoSize = stat.size;
        const headers = {
            'Content-Length': videoSize,
            'Accept-Ranges': 'bytes',
            'Content-Type': `video/${fileExtension}`,
        };

        res.writeHead(200, headers);
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', (error) => {
            createError.BadRequest(error.message);
        });
        fileStream.pipe(res);
    });
});

const getAudioContent = catchAsync(async (req, res) => {
    const { path: filePath, filename, fileExtension } = req.attachment;
    if (!fs.existsSync(filePath)) {
        throw createError.NotFound('attachment not found')
    } else {
        res.setHeader('content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', `audio/${fileExtension}`);
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', (error) => {
            createError.BadRequest(error.message);
        }).pipe(res);
    }
});


// download video
// const getVideoContent = catchAsync(async (req, res) => {
//     console.log('getVideoContent', req.attachment)
//     const { path: filePath, filename, fileExtension } = req.attachment;
//     if (!fs.existsSync(filePath))
//         throw createError.NotFound('filePath not found')

//     res.setHeader("content-disposition", `attachment; filename=${filename}`);
//     res.setHeader("Content-Type", `video/${fileExtension}`);
//     const readStream = fs.createReadStream(filePath)
//     readStream.pipe(res);
// });


//get document file content
const getDocumentContent = catchAsync(async (req, res) => {
    const { path: filePath, filename, mimetype } = req.attachment;
    if (!fs.existsSync(filePath)) {
        throw createError.NotFound('attachment not found')
    } else {
        res.setHeader('content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', `${mimetype}`);
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', (error) => {
            console.log(`Error reading file ${filePath}.`);
            console.log(error);
            res.sendStatus(500);
        });
        fileStream.pipe(res);
    }
});



export const attachmentContentController = {
    getImageContent,
    getVideoContent,
    getDocumentContent,
    getAudioContent,
};
