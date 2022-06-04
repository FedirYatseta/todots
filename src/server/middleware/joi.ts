import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IAuthor } from '../models/author';
import { ITask } from '../models/task';
import Logging from '../library/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.boolean().required(),
            deadline: Joi.string()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string(),
            description: Joi.string(),
            status: Joi.boolean().required(),
            deadline: Joi.string()
        })
    },
    task: {
        create: Joi.object<ITask>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<ITask>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};