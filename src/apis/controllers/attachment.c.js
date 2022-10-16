import createError from 'http-errors';
import AttachmentModel from '../models/attachment.m';
import catchAsync from '../utils/catch-async';


const createAttachment = catchAsync(async (req, res) => {
    const { userId } = req.payload
    if (!req.file)
        throw createError.BadRequest();
    const file = new AttachmentModel({
        ...req.file,
        createdById: userId
    });
    const newFile = await file.save();
    return res.json({
        status: 200,
        data: newFile,
    })
});

const createAttachments = catchAsync(async (req, res) => {
    if (!req.files || req.files.length <= 0)
        throw createError.BadRequest();

    await req.files.map(async (file) => {
        await AttachmentModel.create({
            ...file,
        });
    })
    return res.json({
        status: 200,
        data: req.files
    })
});

const getAttachment = catchAsync(async (req, res) => {
    const attachment = await AttachmentModel.findOne({
        _id: req.params.attachmentId,
        deletedById: { $exists: false }
    });
    if (!attachment)
        throw createError.NotFound('attachment not found');
    return res.json({
        status: 200,
        data: attachment,
    })
});

export const attachmentController = {
    createAttachment,
    getAttachment,
    createAttachments
}
