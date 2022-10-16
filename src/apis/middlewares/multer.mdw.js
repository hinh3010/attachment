import createError from 'http-errors';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import env from '../../env';
import { ALL_FILE_TYPES } from '../types/enumTypes';
import { toSlug } from '../utils/toSlug';


const storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, env.rootpath)
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        const fileName = file.originalname.slice(0, file.originalname.lastIndexOf(extname))
        const slug = `${uuidv4().toString()}-${Date.now()}-${toSlug(fileName)}${extname}`;
        cb(null, slug)
    }
})

const imageFilter = function (req, file, cb) {
    const fileExtension = path.extname(file.originalname).toLowerCase().replace(".", "");
    const fileExtensionValid = Object.keys(ALL_FILE_TYPES).indexOf(fileExtension) >= 0;
    if (fileExtensionValid) {
        // file.fileExtension = fileExtension
        return cb(null, true);
    }
    cb(new Error(`Invalid file type. Only picture file on type ${Object.keys(ALL_FILE_TYPES).join(", ")} are allowed!`));
}

export const upload = multer({
    storage: storageFile,
    fileFilter: imageFilter
})

export const uploadMultipleFiles = multer({
    storage: storageFile,
    fileFilter: imageFilter
}).array('multiple_images', 5);
