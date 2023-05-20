import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //Seniors are below.
  const darcy = await prisma.user.upsert({
    where: { email: "FitzwilliamDarcy@mail.com" },
    update: {},
    create: {
      username: "Mr. Darcy",
      name: "Fitzwilliam Darcy",
      email: "FitzwilliamDarcy@mail.com",
      password: "10001",
      phoneNumber: "1-555-555-555",
      biography: "I make a lot of money.",
      medicalNeeds: "",
      address: "123 Romance Street",
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

  const isabella = await prisma.user.upsert({
    where: {
      email: "IsabelladeVille@mail.com",
    },
    update: {},
    create: {
      username: "Mrs. Isabella",
      name: "Isabella de Ville",
      email: "IsabelladeVille@mail.com",
      password: "12345",
      phoneNumber: "1-555-555-556",
      biography:
        "I have many cats & I need help feeding them. I also like to walk outside and remember how I played in the snow as a girl.",
      medicalNeeds: "Psoas muscle exercise to reduce pain.",
      address: "123 NotRomance Street",
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

  const veronika = await prisma.user.upsert({
    where: { email: "Kovalchuk@mail.ru" },
    update: {},
    create: {
      username: "Mrs. Veronika",
      name: "Veronika Kovalchuk",
      email: "Kovalchuk@mail.ru",
      password: "123",
      phoneNumber: "1-555-555-557",
      biography: "Ya gavaro pa russki.",
      medicalNeeds: "None",
      address: "124 NotRomance Street",
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

  //Volunteers are below.

  const sadie = await prisma.user.upsert({
    where: {
      email: "sadiegirl1992@mail.com",
    },
    update: {},
    create: {
      username: "Sadie",
      name: "Sadie Williams",
      email: "sadiegirl1992@mail.com",
      password: "1992",
      phoneNumber: "1-555-555-444",
      biography: "I like to help people!",
      medicalNeeds: "",
      address: "321 Volunteer Street",
      sentMessages: {
        create: [],
      },
      receivedMessages: {
        create: [],
      },
      volunteer: {
        create: {},
      },
    },
  });

  const stewart = await prisma.user.upsert({
    where: { email: "jackdanielsconnoissuer1989@mail.com" },
    update: {},
    create: {
      username: "Stewart",
      name: "Stewart Smith",
      email: "jackdanielsconnoissuer1989@mail.com",
      password: "1989",
      phoneNumber: "1-555-555-333",
      biography:
        "Jack Daniels is my best friend, but for you I'll make an exception.",
      medicalNeeds: "",
      address: "322 Volunteer Street",
      sentMessages: { create: [] },
      receivedMessages: { create: [] },
      volunteer: {
        create: {},
      },
    },
  });

  //Tasks are below.

  const taskIsabellaOne = await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      author: { connect: { id: isabella.id } },
      responses: {
        create: [{
          responder: { connect: { id: sadie.id } }
        }]
      },
      type: "EMOTIONAL",
      description:
        "I'd like to deliver flowers to my husband's grave. It's a hard time.",
      creationDate: new Date(),
      scheduledDate: new Date(),
      location: "123 NotRomance Street",
    },
  });

  const taskVeronikaOne = await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      author: { connect: { id: veronika.id } },
      responses: {
        create: [
          { responder: { connect: { id: stewart.id } } },
          { responder: { connect: { id: sadie.id } } }
        ],
      },
      accepted: { connect: { id: sadie.id } },
      type: "EMOTIONAL",
      description: "I'd like company while I walk.",
      creationDate: new Date(),
      scheduledDate: new Date(),
      location: "124 NotRomance Street",
    },
  });

  const taskVeronikaTwo = await prisma.task.upsert({
    where: { id: 3 },
    update: {},
    create: {
      author: { connect: { id: veronika.id } },
      accepted: {},
      type: "PHYSICAL",
      description: "I need help with my garden. The rocks are heavy.",
      creationDate: new Date(),
      scheduledDate: new Date(),
      location: "124 NotRomance Street",
    },
  });

  const messageStewartToIsabellaOne = await prisma.messages.upsert({
    where: { id: 1 },
    update: {},
    create: {
      message:
        "Hey! I'll help you out with that. My friend Jack can come, too. He can help.",
      senderId: darcy.id,
      receiverId: isabella.id,
    },
  });

  const messageIsabellaToStewartOne = await prisma.messages.upsert({
    where: { id: 2 },
    update: {},
    create: {
      message:
        "You're okay, but don't bring Jack. He's what put my husband to his grave in the first place!",
      senderId: isabella.id,
      receiverId: stewart.id,
    },
  });

  console.log();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
