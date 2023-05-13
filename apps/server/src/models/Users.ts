import { User, PrismaClient, Volunteer, Senior } from "@prisma/client";

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

  async deleteUser(userId: number): Promise<User> {
    const deletedUser = await prismaInstance.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  },

  async editUser(
    userId: number,
    username: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    biography: string,
    medicalNeeds: string,
    address: string
  ): Promise<Senior> {
    const updateUser = await prismaInstance.user.update({
      where: { id: userId },
      data: {
        username,
        name,
        email,
        password,
        phoneNumber,
        biography,
        medicalNeeds,
        address,
      },
    });
    return updateUser;
  },
};

// username,
// name,
// email,
// password,
// phoneNumber,
// biography,
// medicalNeeds,
// address,
// sentMessages: {
//   create: [],
// },
// receivedMessages: {
//   create: [],
// },
// senior: {
//   create: {
//     authorTask: { create: [] },
//   },

// model Messages {
//   id         Int    @id @default(autoincrement())
//   message    String
//   senderId   Int?
//   sender     User?  @relation(name: "sender", fields: [senderId], references: [id], onDelete: SetNull)
//   receiverId Int?
//   receiver   User?  @relation(name: "receiver", fields: [receiverId], references: [id], onDelete: SetNull)
// }

export default User;
