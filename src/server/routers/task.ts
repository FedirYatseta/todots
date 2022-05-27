import express from 'express';
import controller from '../controllers/task';
import { Schemas, ValidateJoi } from '../middleware/joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.book.create), controller.createTask);
router.get('/get/:taskId', controller.readTask);
router.get('/get/', controller.readAll);
router.patch('/update/:taskId', ValidateJoi(Schemas.book.update), controller.updateTask);
router.delete('/delete/:taskId', controller.deleteTask);

export = router;