import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    email?: string | any;
    password?: string;
    roles: object;
    refreshToken?: [''] | any;
}

export interface IUserModel extends IUser, Document { }

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        roles: {
            User: {
                type: Number,
                default: 2001
            },
            Editor: Number,
            Admin: Number
        },
        refreshToken: [String]
    },
    {
        versionKey: false
    }
);


export default mongoose.model<IUserModel>('User', UserSchema);