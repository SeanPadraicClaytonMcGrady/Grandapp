import { Request, Response, NextFunction } from "express";
import User from "../models/Users";

const UsersController = {
  async getUsers(_: Request, res: Response, next: NextFunction) {
    try {
      const allUsers = await User.findAll();
      res.status(200).json(allUsers);
    } catch (e) {
      next(e);
    }
  },
};

export default UsersController;
