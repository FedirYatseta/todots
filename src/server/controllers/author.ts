import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author, { IAuthor } from '../models/author';

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, status, deadline } = req.body;

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        status,
        deadline
    });

    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
};

const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const todos: IAuthor[] = await Author.find()
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }

};

const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                author.set(req.body);
                return author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId
    return await Author.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ author, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };

// try {
//     const todos: IAuthor[] = await Author.find()
//     res.status(200).json({ todos })
// } catch (error) {
//     throw error
// }