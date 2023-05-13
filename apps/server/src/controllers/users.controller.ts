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

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      await User.deleteUser(userId);
      return res.status(201).json({
        message: "This user has been deleted.",
      });
    } catch (e) {
      next(e);
    }
  },

  async editUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        username,
        name,
        email,
        password,
        phoneNumber,
        biography,
        medicalNeeds,
        address,
      } = req.body;
      const userId = parseInt(req.params.id);
      const updatedUser = await User.editUser(
        userId,
        username,
        name,
        email,
        password,
        phoneNumber,
        biography,
        medicalNeeds,
        address
      );
      return res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  },
};

export default UsersController;
