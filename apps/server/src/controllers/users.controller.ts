import { Request, Response, NextFunction } from "express";
import User from "../models/Users";
import { Volunteer, Senior } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import atob from "atob";
// import  passwordUtils  from "../utils/passwordUtils";

const saltRounds = 10;

// async function hashPassword(pasw: string): Promise<string> {
//   const hashed = await bcrypt.hash(pasw, saltRounds)
//   return hashed
// }
function checkPassword(pasw: string, hashedPasw: string): Boolean {
  return bcrypt.compareSync(pasw, hashedPasw);
}

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

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const secret = process.env.JWT_SECRET;
      console.log(secret);
      if (!secret) return res.status(500);
      const { username, password } = req.body;
      const existingUser = await User.findUser(username);
      const checkPasw = checkPassword(password, existingUser.password);

      if (checkPasw === false) {
        return res.status(401).json({
          message: "Wrong credentials.",
        });
      }

      const token = jwt.sign(username, secret);
      res.setHeader(
        `Set-Cookie`,
        `AUTHORIZATION=BEARER ${token}; Max-Age=90000;`
      );
      return res
        .status(200)
        .json({ ...existingUser, type: inferUserType(existingUser), token });
    } catch (e) {
      return next(e);
    }
  },
};

function inferUserType(
  user: User & {
    volunteer: Volunteer | null;
    senior: Senior | null;
  }
): string {
  if (user.volunteer) {
    return "volunteer";
  }

  return "senior";
}

export default UsersController;
