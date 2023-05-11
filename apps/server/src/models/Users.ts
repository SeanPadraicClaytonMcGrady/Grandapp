import { User, PrismaClient } from "@prisma/client";

const prismaInstance = new PrismaClient();

const User = {
  async findAll(): Promise<User[]> {
    const users = await prismaInstance.user.findMany({
      include: {
        senior: true,
        volunteer: true,
      },
    });
    return users;
  },
};

export default User;
