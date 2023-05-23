import { NextFunction, Request, Response } from "express";
import Volunteer from "../models/Volunteers";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import atob from 'atob'
import User from "../models/Users";
// import  passwordUtils  from "../utils/passwordUtils";
const saltRounds = 10

async function hashPassword(pasw: string): Promise<string> {
  const hashed = await bcrypt.hash(pasw, saltRounds)
  return hashed
}
// function checkPassword(pasw: string, hashedPasw: string): Boolean {
//   return bcrypt.compareSync(pasw, hashedPasw)
// }


const VolunteersController = {
  async create(req: Request, res: Response, next: NextFunction) {
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
      if (!username || !name || !password || !email || !phoneNumber || !biography || !address) {
        throw new Error('Missing parameters.')
      }

      const hashedPasw = await hashPassword(password)
      const newVolunteer = await Volunteer.createVolunteer(
        username,
        name,
        email,
        hashedPasw,
        phoneNumber,
        biography,
        medicalNeeds,
        address
      )
      const resp = {
        username: newVolunteer.username,
        name: newVolunteer.name,
        email: newVolunteer.email,
        phoneNumber: newVolunteer.phoneNumber,
        biography: newVolunteer.biography,
        medicalNeeds: newVolunteer.medicalNeeds,
        address: newVolunteer.address,
      }
      //We need to add hashes to passwords.
      return res.status(201).json(resp);
    } catch (e) {
      next(e);
    }
  },

  async getVolunteers(req: Request, res: Response, next: NextFunction) {
    try {
      const allVolunteers = await Volunteer.findAll();
      return res.status(201).json(allVolunteers);
    } catch (e) {
      next(e);
    }
  },

  async getVolunteerByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username } = req.body;
      const volunteer = await Volunteer.findVolunteer(username);
      return res.status(201).json(volunteer);
    } catch (e) {
      next(e);
    }
  },
};

export default VolunteersController;
