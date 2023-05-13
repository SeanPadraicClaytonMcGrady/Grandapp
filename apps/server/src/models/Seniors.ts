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
  ): Promise<Senior> {
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

//A SENIOR PROFILE BELOW

// const isabella = await prisma.user.upsert({
//   where: {
//     email: "IsabelladeVille@mail.com"
//   },
//   update: {},
//   create: {
//     username: "Mrs. Isabella",
//     name: "Isabella de Ville",
//     email: "IsabelladeVille@mail.com",
//     password: "12345",
//     phoneNumber: "1-555-555-556",
//     biography:
//       "I have many cats & I need help feeding them. I also like to walk outside and remember how I played in the snow as a girl.",
//     medicalNeeds: "Psoas muscle exercise to reduce pain.",
//     address: "123 NotRomance Street",
//     sentMessages: {
//       create: []
//     },
//     receivedMessages: {
//       create: []
//     },
//     senior: {
//       create: {
//         authorTask: { create: [] },
//       },
//     },
//   },
// });

// TASK IS BELOW

// const taskIsabellaOne = await prisma.task.upsert({
//   where: { id: 1 },
//   update: {},
//   create: {
//     author: { connect: { id: isabella.id } },
//     responder: { connect: { id: stewart.id } },
//     type: "EMOTIONAL",
//     description:
//       "I'd like to deliver flowers to my husband's grave. It's a hard time.",
//     creationDate: new Date(),
//     scheduledDate: new Date(),
//     location: "123 NotRomance Street",
//   },
// });

//SENIOR'S MESSAGE BELOW

// const messageIsabellaToStewartOne = await prisma.messages.upsert({
//   where: { id: 2 },
//   update: {},
//   create: {
//     message:
//       "You're okay, but don't bring Jack. He's what put my husband to his grave in the first place!",
//     senderId: isabella.id,
//     receiverId: stewart.id,
//   },
// });

export default Senior;
