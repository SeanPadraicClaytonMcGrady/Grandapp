import { Request, Response, NextFunction } from "express";
import User from "../models/Users";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import atob from 'atob'
// import  passwordUtils  from "../utils/passwordUtils";

const saltRounds = 10

// async function hashPassword(pasw: string): Promise<string> {
//   const hashed = await bcrypt.hash(pasw, saltRounds)
//   return hashed
// }
function checkPassword(pasw: string, hashedPasw: string): Boolean {
  return bcrypt.compareSync(pasw, hashedPasw)
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

      const authHeader = req.headers.authorization?.split('Basic ')
      if (!authHeader) {
        return res.status(401).json({
          message: 'There are no headers'
        })
      }
      const decoded = atob(authHeader.toString())
      const [username, password] = decoded.split(':')
      const user = await User.findUser(username)
      if (!user) {
        return res.status(401).json({
          message: 'User does not exist'
        })
      }
      const checkPasw = checkPassword(password, user.password)
      if (checkPasw === false) {
        return res.status(401).json({
          message: 'Incorrect password.'
        })
      }
      const secret = process.env.JWT_SECRET
      if (!secret) return res.status(500)
      const token = jwt.sign(user, secret)
      return res.status(200).json({ id: user.id, user: user.username, token, type: inferUserType(user) })
    } catch (e) {
      return next(e)
    }
  }

};

function inferUserType(user: User): "senior" | "volunteer" {
  if (user.volunteer) {
    return "volunteer"
  }
  return "senior"
}

export default UsersController;
