import express, { Router } from 'express';

import creatorController from '../controllers/creatorController';

const router: Router = express.Router();

router.post('/', creatorController.createCreator);
router.get('/:creatorId', creatorController.getCreator);
router.delete('/:creatorId', creatorController.deleteCreator);

export default router;
