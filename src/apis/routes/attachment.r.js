
import express from 'express';
import { attachmentController } from '../controllers/attachment.c';
import { attachmentContentController } from '../controllers/attachmentContent.c';
import { fileMiddleware } from '../middlewares/file.mdw';
import { upload } from '../middlewares/multer.mdw';
import validate from '../middlewares/validations/validate.js';
import schemaValidator from '../middlewares/validations/validateSchema';

const attachmentRouter = express.Router({ mergeParams: true });


attachmentRouter.route('/')
    .post(
        upload.single('files'),
        attachmentController.createAttachment
    );
attachmentRouter.route('/multiple')
    .post(
        upload.array('files'),
        attachmentController.createAttachments
    );


attachmentRouter.route('/:attachmentId')
    .get(
        validate(schemaValidator.idSchema),
        attachmentController.getAttachment
    );

attachmentRouter.route('/image/:filename')
    .get(
        validate(schemaValidator.fileImage),
        fileMiddleware,
        attachmentContentController.getImageContent
    );

attachmentRouter.route('/video/:filename')
    .get(
        validate(schemaValidator.fileVideo, 'filename'),
        fileMiddleware,
        attachmentContentController.getVideoContent
    );

attachmentRouter.route('/audio/:filename').get(
    validate(schemaValidator.fileAudio, 'filename'),
    fileMiddleware,
    attachmentContentController.getAudioContent
);

attachmentRouter.route('/document/:filename')
    .get(
        validate(schemaValidator.fileDoc, 'filename'),
        fileMiddleware,
        attachmentContentController.getDocumentContent
    );




export default attachmentRouter;