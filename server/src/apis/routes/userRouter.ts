import express, { Router } from 'express';

import userController from '../controllers/userController';

const router: Router = express.Router();

router.post('/', userController.createUser);
router.get('/:userId', userController.getUser);
router.delete('/:userId', userController.deleteUser);

export default router;
