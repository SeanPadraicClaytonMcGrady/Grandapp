import { Senior, PrismaClient, User } from "@prisma/client";

const prismaInstance = new PrismaClient();

const Senior = {
  async createSenior(
    username: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    biography: string | null,
    medicalNeeds: string | null,
    address: string
  ): Promise<User> {
    const userSenior = await prismaInstance.user.create({
      data: {
        username,
        name,
        email,
        password,
        phoneNumber,
        biography,
        medicalNeeds,
        address,
        sentMessages: {
          create: [],
        },
        receivedMessages: {
          create: [],
        },
        senior: {
          create: {
            authorTask: { create: [] },
          },
        },
      },
    });
    return userSenior;
  },

  async findAll(): Promise<User[]> {
    const seniors = await prismaInstance.user.findMany({
      include: {
        senior: true,
      },
    });

    const onlySeniors = seniors.filter(
      (allSenior) => allSenior.senior !== null
    );
    return onlySeniors;
  },

  async findSenior(username: string): Promise<Senior> {
    const senior = await prismaInstance.user.findUnique({
      where: { username },
      include: {
        senior: true,
      },
    });
    if (senior === null) {
      throw new Error("Senior does not exist");
    }
    return senior;
  },
};

export default Senior;
