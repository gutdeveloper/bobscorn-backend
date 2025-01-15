import express from 'express';
import { PurchasedCornController } from '../controllers/purchased-corn.controller';
const purchasedCornController = new PurchasedCornController();
const router = express.Router();

router.get('/:clientId', purchasedCornController.getPurchasedCorns);
router.post('/', purchasedCornController.purchaseCorn);

export default router;