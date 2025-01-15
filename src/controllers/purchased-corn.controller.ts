import { Request, Response } from 'express';
import { PurchasedCornService } from '../services/purchased-corn.service';
import { differenceInMinutesBetweenTwoDates } from '../helpers/differenceInMinutesBetweenTwoDates';

export class PurchasedCornController {
    private readonly purchasedCornService;
    constructor() {
        this.purchasedCornService = new PurchasedCornService();
    }
    getPurchasedCorns = async (req: Request, res: Response) => {
        try {
            const clientId = req.params.clientId;
            if (!clientId) {
                res.status(400).json({ message: 'clientId is required' });
            }
            const corns = await this.purchasedCornService.countCorns(clientId)
            res.status(200).json({ corns });
        } catch (error) {
            console.error('Error fetching purchased corns:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    purchaseCorn = async (req: Request, res: Response) => {
        try {
            const clientId = req.body.clientId;
            if (!clientId) {
                res.status(400).json({ message: 'clientId is required' });
            }
            const purchasedCorn = await this.purchasedCornService.lastPurchased(clientId);

            const minutes = differenceInMinutesBetweenTwoDates(String(purchasedCorn?.last_purchase));
            if (minutes <= 0) {
                res.status(429).json({ message: 'Too Many Requests' });
                return;
            }
            const purchase = await this.purchasedCornService.purchase(clientId);
            res.status(200).json({ corns: purchase });
        } catch (error) {
            console.error('Error buy-corn: ', error);
            res.status(500).send('Internal Server Error');
        }
    }
}
