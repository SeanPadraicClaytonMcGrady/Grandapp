import { Request, Response, NextFunction } from "express";
import Senior from "../models/Seniors";
import User from "../models/Users";
import { emit } from "process";
import bcrypt from "bcrypt";

const saltRounds = 10;

async function hashPassword(pasw: string): Promise<string> {
  const hashed = await bcrypt.hash(pasw, saltRounds);
  return hashed;
}

const SeniorsController = {
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
      if (
        !username ||
        !name ||
        !password ||
        !email ||
        !phoneNumber ||
        !biography ||
        !medicalNeeds ||
        !address
      ) {
        throw new Error("Missing parameters.");
      }
      const hashedPasw = await hashPassword(password);
      const newSenior = await Senior.createSenior(
        username,
        name,
        email,
        hashedPasw,
        phoneNumber,
        biography,
        medicalNeeds,
        address
      );
      const resp = {
        username: newSenior.username,
        name: newSenior.name,
        email: newSenior.email,
        phoneNumber: newSenior.phoneNumber,
        biography: newSenior.biography,
        medicalNeeds: newSenior.medicalNeeds,
        address: newSenior.address,
      };

      return res.status(201).json(resp);
    } catch (e) {
      res.status(400).json({ message: "credentials already in use" });
      // next(e);
    }
  },

  async getSeniors(_: Request, res: Response, next: NextFunction) {
    try {
      const allSeniors = await Senior.findAll();
      res.status(201).json(allSeniors);
    } catch (e) {
      next(e);
    }
  },

  async getSeniorByUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.body;
      const senior = await Senior.findSenior(username);
      return res.status(201).json(senior);
    } catch (e) {
      next(e);
    }
  },
};

export default SeniorsController;
