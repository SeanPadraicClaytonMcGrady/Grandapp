import { NextFunction, Request, Response } from "express";
import Volunteer from "../models/Volunteers";

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
      const newVolunteer = await Volunteer.createVolunteer(
        username,
        name,
        password,
        phoneNumber,
        email,
        biography,
        medicalNeeds,
        address
      );
      //We need to add hashes to passwords.
      return res.status(201).json(newVolunteer);
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
