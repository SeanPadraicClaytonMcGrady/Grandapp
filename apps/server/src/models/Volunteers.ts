import { Volunteer, PrismaClient, User } from "@prisma/client";

const prismaInstance = new PrismaClient();

const Volunteer = {
  async createVolunteer(
    username: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    biography: string | null,
    medicalNeeds: string | null,
    address: string
  ): Promise<Volunteer> {
    const userVolunteer = await prismaInstance.user.create({
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
        volunteer: {
          create: {},
        },
      },
    });
    return userVolunteer;
  },

  async findAll(): Promise<User[]> {
    const volunteers = await prismaInstance.user.findMany({
      include: {
        volunteer: true,
      },
    });

    const onlyVolunteers = volunteers.filter(
      (allVolunteers) => allVolunteers.volunteer !== null
    );

    return onlyVolunteers;
  },

  async findVolunteer(username: string): Promise<Volunteer> {
    const volunteer = await prismaInstance.user.findUnique({
      where: { username },
      include: {
        volunteer: true,
      },
    });
    if (volunteer === null) {
      throw new Error("Volunteer does not exist");
    }
    return volunteer;
  },
};
export default Volunteer;
