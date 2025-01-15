import { Prisma, PrismaClient } from "@prisma/client";

export class PurchasedCornService {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    lastPurchased = async (clientDni: string) => {
        try {
            const lastPurchase = await this.prisma.purchasedCorn.findFirst({
                where: {
                    client_id: clientDni
                },
                orderBy: {
                    last_purchase: 'desc'
                }
            });
            return lastPurchase;
        } catch (error) {
            console.error('Error getting last purchase:', error);
            throw new Error('Error getting last purchase');
        } finally {
            await this.prisma.$disconnect();
        }
    }
    countCorns = async (clientId: string) => {
        try {
            const client_id = clientId;
            const purchasedCorns = await this.prisma.purchasedCorn.count({
                where: {
                    client_id
                },
            });
            return purchasedCorns;
        } catch (error) {
            console.error('Error when counting purchases:', error);
            throw new Error('Error when counting purchases');
        } finally {
            await this.prisma.$disconnect();
        }
    }
    purchase = async (clientId: string) => {
        try {
            const purchaseCorn = await this.prisma.purchasedCorn.create({
                data: {
                    client_id: clientId
                }
            });
            if (purchaseCorn) {
                const countCorns = await this.countCorns(clientId);
                return countCorns;
            }
            throw new Error('The purchase was not successful');
        } catch (error) {
            console.error('Error creating purchase:', error);
            throw new Error('Error creating purchase');
        } finally {
            await this.prisma.$disconnect();
        }

    }
}