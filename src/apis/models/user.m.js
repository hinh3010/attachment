import mongoose, { Schema } from 'mongoose';
import constType from '../types/const.type';
import { ACCOUNT_STATUS, ACCOUNT_TYPE, AUTH_TYPE } from '../types/enumTypes';
import plugin from './plugins/index.plugin';
import conn from '../../connect/connect_mongodb'

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        displayName: { type: String, trim: true },
        avatarUrl: { type: String, default: null },
        email: { type: String, unique: true, trim: true, lowercase: true },
        accountType: { type: [String], enum: ACCOUNT_TYPE, default: [constType.STUDENT] },
        password: { type: String, trim: true },
        phone: { type: String, unique: true },
        averageRatings: { type: Number, default: 0 },

        // link
        socialLink: {
            type: [
                {
                    socialName: { type: String },
                    socialUrl: { type: String }
                },
            ],
            default: null
        },

        // admin
        isAdmin: { type: Boolean, default: false },
        isSuperAdmin: { type: Boolean, default: false },

        // status
        accountStatus: {
            type: String,
            enum: ACCOUNT_STATUS,
            default: constType.ACTIVE,
        },
        changeStatusById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },

        // delete
        deletedAt: { type: Date, default: null },
        deletedById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },


        // auth
        authGoogleID: { type: String, default: null },
        authFacebookID: { type: String, default: null },
        authType: { type: String, enum: AUTH_TYPE, default: constType.LOCAL },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)



// // plugin
userSchema.plugin(plugin.paginatePlugin);
userSchema.plugin(plugin.paginatePluginV2);
userSchema.plugin(plugin.jsonPlugin);



const UserModel = conn.connServer.model('User', userSchema)
// const UserModel = mongoose.model('User', userSchema)
export default UserModel
