import {
  PrismaClient,
  User,
  Senior,
  Volunteer,
  Messages,
} from "@prisma/client";

const prismaInstance = new PrismaClient();

const Messages = {
  async createMessage(
    message: string,
    senderId: number,
    receiverId: number
  ): Promise<Messages> {
    const newMessage = await prismaInstance.messages.create({
      data: {
        message,
        sender: { connect: { id: senderId } },
        receiver: { connect: { id: receiverId } },
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    return newMessage;
  },

  async findMessage(messageId: number): Promise<any> {
    const foundMessage = await prismaInstance.messages.findUnique({
      where: { id: messageId },
    });
    return foundMessage;
  },

  async deleteMessage(messageId: number): Promise<Messages> {
    const deletedMessage = await prismaInstance.messages.delete({
      where: { id: messageId },
    });
    return deletedMessage;
  },
};

export default Messages;
