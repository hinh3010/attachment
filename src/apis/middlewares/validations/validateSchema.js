import Joi from "joi";
import { FILE_FIT_TYPE, SHARP_AUDIO_TYPE, SHARP_DOCUMENT_TYPE, SHARP_IMAGE_TYPE, SHARP_VIDEO_TYPE } from "../../types/enumTypes";
import { getFileExtension } from "../../utils/resizeImage";

const idSchema = {
    params: Joi.object().keys({
        attachmentId: Joi.string().custom((value, helper) => {
            if (!value.match(/^[0-9a-fA-F]{24}$/))
                return helper.message('"{{#label}}" must be a valid mongo id')
            return value
        })
    })
};


const fileImage = {
    params: Joi.object().keys({
        filename: Joi.string().custom((value, helpers) => {
            const fileExtension = getFileExtension(value)
            if (!fileExtension) {
                return helpers.message('"{{#fileExtension}}" not found');
            }
            if (Object.keys(SHARP_IMAGE_TYPE).indexOf(fileExtension.toLowerCase()) > -1) {
                return value;
            } else {
                return helpers.message('"{{#label}}" not match image');
            }
        })
    }),
    query: Joi.object().keys({
        width: Joi.number(),
        height: Joi.number(),
        fit: Joi.string().optional().valid(...Object.values(FILE_FIT_TYPE))
    })
}

const fileVideo = {
    params: Joi.object().keys({
        filename: Joi.string().custom((value, helpers) => {
            const fileExtension = getFileExtension(value)
            if (!fileExtension) {
                return helpers.message('"{{#fileExtension}}" not found');
            }
            if (Object.keys(SHARP_VIDEO_TYPE).indexOf(fileExtension.toLowerCase()) > -1) {
                return value;
            } else {
                return helpers.message('"{{#label}}" not match video');
            }
        })
    }),
    query: Joi.object().keys({
        width: Joi.number(),
        height: Joi.number(),
        fit: Joi.string().optional().valid(...Object.values(FILE_FIT_TYPE))
    })
}

const fileAudio = {
    params: Joi.object().keys({
        filename: Joi.string().custom((value, helpers) => {
            const fileExtension = getFileExtension(value)
            if (!fileExtension) {
                return helpers.message('"{{#fileExtension}}" not found');
            }
            if (Object.keys(SHARP_AUDIO_TYPE).indexOf(fileExtension.toLowerCase()) > -1) {
                return value;
            } else {
                return helpers.message('"{{#label}}" not match audio');
            }
        })
    }),
    query: Joi.object().keys({
        width: Joi.number(),
        height: Joi.number(),
        fit: Joi.string().optional().valid(...Object.values(FILE_FIT_TYPE))
    })
}

const fileDoc = {
    params: Joi.object().keys({
        filename: Joi.string().custom((value, helpers) => {
            const fileExtension = getFileExtension(value)
            if (!fileExtension) {
                return helpers.message('"{{#fileExtension}}" not found');
            }
            if (Object.keys(SHARP_DOCUMENT_TYPE).indexOf(fileExtension.toLowerCase()) > -1) {
                return value;
            } else {
                return helpers.message('"{{#label}}" not match document');
            }
        })
    }),
    query: Joi.object().keys({
        width: Joi.number(),
        height: Joi.number(),
        fit: Joi.string().optional().valid(...Object.values(FILE_FIT_TYPE))
    })
}

const schemaValidator = {
    idSchema, fileImage, fileVideo, fileAudio, fileAudio, fileDoc
}

export default schemaValidator


