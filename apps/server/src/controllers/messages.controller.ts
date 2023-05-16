import { Request, Response, NextFunction } from "express";
import Messages from "../models/Messages";
import { create } from "domain";

const MessagesController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, senderId, receiverId } = req.body;
      console.log(req.body);
      const newMessage = await Messages.createMessage(
        message,
        senderId,
        receiverId
      );
      return res.status(201).json(newMessage);
    } catch (e) {
      next(e);
    }
  },

  async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const messageId = parseInt(req.params.id);
      const gottenMessage = await Messages.findMessage(messageId);
      return res.status(201).json(gottenMessage);
    } catch (e) {
      next(e);
    }
  },

  async deleteMessageById(req: Request, res: Response, next: NextFunction) {
    try {
      const messageId = parseInt(req.params.id);
      await Messages.deleteMessage(messageId);
      return res.status(201).json({
        message: "This message has been deleted.",
      });
    } catch (e) {
      next(e);
    }
  },
};

export default MessagesController;
