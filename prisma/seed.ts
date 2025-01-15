import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const clients = ["1143114807", "1143445678"]
    const data = clients.flatMap(client_id =>
        Array(4).fill(null).map(() => ({
            client_id,
            last_purchase: new Date()
        }))
    )

    await prisma.purchasedCorn.createMany({ data })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
