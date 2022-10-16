import mongoose, { Schema } from 'mongoose';
import plugin from './plugins/index.plugin';

const attachmentSchema = new Schema({
    originalname: {
        type: String,
        required: true,
    }, //Screen Recording 2022-05-31 at 19.37.26.mov,
    encoding: {
        type: String,
        required: true,
    }, //7bit,
    mimetype: {
        type: String,
        required: true,
    }, //video/quicktime,
    destination: {
        type: String,
        required: true,
    }, //uploads,
    filename: {
        type: String,
        required: true,
    }, // f787fdcb-aa35-4eb3-af8e-11d6b99b3ff1-screen-recording-2022-05-31-at-193726.mov,
    path: {
        type: String,
        required: true,
    }, //uploads/f787fdcb-aa35-4eb3-af8e-11d6b99b3ff1-screen-recording-2022-05-31-at-193726.mov,
    size: {
        type: Number,
        required: true,
    }, //720488

    fileExtension: {
        type: String,
        required: false,
    },
    fileType: {
        type: String,
        required: false,
    },

    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },

    deletedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    deletedAt: { type: Date, required: false },
});


function preSave() {
    console.log("attachmentSchema: preSave", this.get("mimetype"))
    const mimetypeExplode = this.mimetype.split("/")
    this.fileExtension = mimetypeExplode[1];
    this.fileType = mimetypeExplode[0];
}
attachmentSchema.pre("save", preSave)
attachmentSchema.pre("findOneAndUpdate", preSave)
attachmentSchema.pre("updateOne", preSave)

// plugin
attachmentSchema.plugin(plugin.paginatePlugin);
attachmentSchema.plugin(plugin.paginatePluginV2);
attachmentSchema.plugin(plugin.jsonPlugin);



const AttachmentModel = mongoose.model('Attachment', attachmentSchema)

export default AttachmentModel;
