import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor {
    name: string;
    description: string
    status: boolean
    deadline: string
    createdAt?: string
    updatedAt?: string

}

export interface IAuthorModel extends IAuthor, Document { }

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        status: { type: Boolean, required: true },
        deadline: { type: String, required: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);