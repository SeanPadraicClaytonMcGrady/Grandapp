import { User, PrismaClient, Volunteer, Senior } from "@prisma/client";
import { NextFunction } from "express";

const prismaInstance = new PrismaClient();

type UserWithUserType = User & {
  volunteer: Volunteer | null;
  senior: Senior | null;
  role: "senior" | "volunteer";
};

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

  async findUser(username: string): Promise<UserWithUserType> {
    const user = await prismaInstance.user.findUnique({
      where: { username },
      include: {
        volunteer: true,
        senior: true,
      },
    });
    if (user === null) {
      throw new Error("User does not exist");
    }
    const role = user.volunteer ? "volunteer" : "senior";
    const foundUser: UserWithUserType = {
      ...user,
      role,
    };
    return foundUser;
  },
};

export default User;
