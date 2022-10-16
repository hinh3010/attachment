import createError from 'http-errors';
import AttachmentModel from "../models/attachment.m"
import catchAsync from '../utils/catch-async';

export const fileMiddleware = catchAsync(async (req, res, next) => {
    const attachment = await AttachmentModel.findOne({
        filename: req.params.filename,
        deletedById: { $exists: false }
    })

    if (!attachment) throw createError.NotFound('file not found')

    req.attachment = attachment
    next()
})