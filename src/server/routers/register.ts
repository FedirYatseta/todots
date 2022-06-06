import express from 'express';
import registerController from '../controllers/registerController';
const router = express.Router();

router.post('/', registerController.handleNewUser);

export = router


