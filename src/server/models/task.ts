import mongoose, { Document, Schema } from 'mongoose';

export interface ITask {
    title: string;
    author: string;
}

export interface ITaskModel extends ITask, Document { }

const TaskSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ITaskModel>('Book', TaskSchema);