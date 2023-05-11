import { Senior, PrismaClient } from '@prisma/client'

const prismaInstance = new PrismaClient()


async function create(username: string, name: string, email: string, password: string, phoneNumber: string, biography: string | null, medicalNeeds: string | null, address: string): Promise<Senior> {
    const user = await prismaInstance.user.create({
        data: {
            username,
            password,
            name,
            email,
            phoneNumber,
            biography,
            medicalNeeds,
            address,
        },
        include: {
            senior: true
        }
    })
    return user
}

async function findAll(): Promise<Senior[]> {
    const seniors = await prismaInstance.senior.findMany()
    return seniors
}