import { Volunteer, PrismaClient } from '@prisma/client'

const prismaInstance = new PrismaClient()


async function create(username: string, name: string, email: string, password: string, phoneNumber: string, biography: string | null, medicalNeeds: string | null, address: string): Promise<Volunteer> {
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
            volunteer: true
        }
    })
    return user
}

async function findAll(): Promise<Volunteer[]> {
    const volunteers = await prismaInstance.volunteer.findMany()
    return volunteers
}

export { create, findAll }