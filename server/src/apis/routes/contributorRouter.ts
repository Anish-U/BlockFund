import express, { Router } from 'express';

import contributorController from '../controllers/contributorController';

const router: Router = express.Router();

router.post('/', contributorController.createContributor);
router.get('/:contributorId', contributorController.getContributor);
router.delete('/:contributorId', contributorController.deleteContributor);

export default router;
