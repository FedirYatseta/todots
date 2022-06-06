import express from 'express';
const router = express.Router();
import usersController from '../controllers/usersController';
import ROLES_LIST from '../config/role_list';
import verifyRoles from '../middleware/verifyRoles';

router.route('/')
    .get(usersController.getAllUsers)
    //.get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(), usersController.deleteUser);

router.route('/:id')
    .get(verifyRoles(), usersController.getUser);

export = router