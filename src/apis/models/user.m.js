import mongoose, { Schema } from 'mongoose';
import plugin from './plugins/index.plugin';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },

    deletedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    deletedAt: { type: Date, required: false },
});



// plugin
userSchema.plugin(plugin.paginatePlugin);
userSchema.plugin(plugin.paginatePluginV2);
userSchema.plugin(plugin.jsonPlugin);



const UserModel = mongoose.model('User', userSchema)
export default UserModel
