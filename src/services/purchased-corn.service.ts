import { Prisma, PrismaClient } from "@prisma/client";
import Redis from "ioredis";

export class PurchasedCornService {
    private prisma: PrismaClient;
    private redis;
    constructor() {
        this.prisma = new PrismaClient();
        this.redis = new Redis();
    }
    lastPurchased = async (clientId: string) => {
        try {
            let lastPurchased = await this.redis.get(`clientId:${clientId}:lastPurchased`);
            if (lastPurchased == null) {
                const purchase = await this.prisma.purchasedCorn.findFirst({
                    where: {
                        client_id: clientId
                    },
                    orderBy: {
                        last_purchase: 'desc'
                    }
                });
                lastPurchased = String(purchase?.last_purchase)
                this.redis.set(`clientId:${clientId}:lastPurchased`, lastPurchased);
            }
            return lastPurchased;
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