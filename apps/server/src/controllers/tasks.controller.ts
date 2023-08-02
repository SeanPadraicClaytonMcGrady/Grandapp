import { Request, Response, NextFunction } from "express";
import Tasks from "../models/Tasks";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

const TasksController = {
  async findTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = parseInt(req.params.id);
      const task = await Tasks.findTask(taskId);
      return res.status(200).json(task);
    } catch (e) {
      next(e);
    }
  },

  async findAllTasks(_: Request, res: Response, next: NextFunction) {
    try {
      const allTasks = await Tasks.findAllTasks();
      return res.status(200).json(allTasks);
    } catch (e) {
      next(e);
    }
  },

  async volunteerCancelTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const taskId = parseInt(req.params.id);
      const responderId = req.user.id;
      const declinedTask = await Tasks.deleteResponse(taskId, responderId);
      return res.status(201).json(declinedTask);
    } catch (e) {
      next(e);
    }
  },

  async volunteerGetSingleSeniorTasksById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const seniorId = parseInt(req.params.id);
      const fetchedTasks = await Tasks.getTasksBySeniorId(seniorId);
      return res.status(201).json(fetchedTasks);
    } catch (e) {
      next(e);
    }
  },

  async volunteerGetAcceptedTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const volunteerId = req.user.id;
      const fetchedAcceptedTasks = await Tasks.getToDoTasks(volunteerId);
      return res.status(201).json(fetchedAcceptedTasks);
    } catch (e) {
      next(e);
    }
  },

  async getRelevantTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const openTasks = await Tasks.getOpenTasks(userId);
      const pendingTasks = await Tasks.getPendingTasks(userId);
      const acceptedTasks = await Tasks.getToDoTasks(userId);

      return res.json({
        openTasks,
        pendingTasks,
        acceptedTasks,
      });
    } catch (e) {
      next(e);
    }
  },

  //I think the Mr. Darcy Dominance bug takes place here.
  //I believe the problem is that this controller was destructuring something which didn't exist.
  //Then in Prisma it would default to 1. I think. I'm not actually sure.
  //In any event, the previous code was incorrect because it didn't take information from credentials.
  //I will work on this ASAP. -Sean

  async newEmotionalTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorId, type, description, scheduledDate, location } = req.body;
      console.log(scheduledDate);
      const emotionalTask = await Tasks.createEmotionalTask(
        Number(authorId),
        type,
        description,
        scheduledDate,
        location
      );
      return res.status(201).json(emotionalTask);
    } catch (e) {
      next(e);
    }
  },

  async newPhysicalTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorId, type, description, scheduledDate, location } = req.body;
      console.log(scheduledDate);
      const physicalTask = await Tasks.createPhysicalTask(
        authorId,
        type,
        description,
        scheduledDate,
        location
      );
      return res.status(201).json(physicalTask);
    } catch (e) {
      next(e);
    }
  },

  async editTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const { description, scheduledDate, location } = req.body;
      const userId = parseInt(req.params.id);
      const editedTask = await Tasks.editTask(
        userId,
        description,
        scheduledDate,
        location
      );
      return res.status(201).json(editedTask);
    } catch (e) {
      next(e);
    }
  },

  async deleteTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = parseInt(req.params.id);
      await Tasks.deleteTask(taskId);
      return res.status(201).json({ message: "This task has been deleted!" });
    } catch (e) {
      next(e);
    }
  },

  //Volunteer needs to put its id into response of task.

  async volunteerApplyToTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.body);
      // const taskId = parseInt(req.params.id)
      // const  = parseInt(req.body.userId)
    } catch (e) {
      next(e);
    }
  },

  async volunteerConfirmedByAcceptedId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const responderIds = req.body.responderIds;
      const taskId = parseInt(req.params.id);
      const accept = await Tasks.accept(taskId, responderIds);
      return res.status(201).json(accept);
    } catch (e) {
      next(e);
    }
  },

  async createResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const responderId = req.user.id;
      const taskId = Number(req.params.id);
      const response = await Tasks.createResponse(taskId, responderId);
      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default TasksController;
