import express, { Router } from 'express';

import userController from '../controllers/userController';

const router: Router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:userId', userController.getUser);
router.delete('/:userId', userController.deleteUser);

export default router;
