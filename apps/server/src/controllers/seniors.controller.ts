import { Request, Response, NextFunction } from "express";
import Senior from "../models/Seniors";
import User from "../models/Users";

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
      //We need to add hashes to passwords.
      const newSenior = await Senior.createSenior(
        username,
        name,
        email,
        password,
        phoneNumber,
        biography,
        medicalNeeds,
        address
      );

      return res.status(201).json(newSenior);
    } catch (e) {
      next(e);
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

  async deleteSeniorByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username } = req.body.username;
      await Senior.deleteSenior(username);
      return res.status(201).json("This senior has been deleted");
    } catch (e) {
      next(e);
    }
  },
};

export default SeniorsController;
