import { User, PrismaClient } from '@prisma/client'

const prismaInstance = new PrismaClient()

async function findAll(): Promise<User[]> {
    const users = await prismaInstance.user.findMany()
    return users
}

