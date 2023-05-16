import { Request, Response, NextFunction } from "express";
import Tasks from "../models/Tasks";

const TasksController = {
  async findTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = parseInt(req.params.id);
      const task = await Tasks.findTask(taskId);
      return res.status(201).json(task);
    } catch (e) {
      next(e);
    }
  },

  async findAllTasks(_: Request, res: Response, next: NextFunction) {
    try {
      const allTasks = await Tasks.findAllTasks();
      return res.status(201).json(allTasks);
    } catch (e) {
      next(e);
    }
  },

  async findSeniorTasks(_: Request, res: Response, next: NextFunction) {
    try {
      const allSeniorTasks = await Tasks.findAllSeniorTasks();
      return res.status(201).json(allSeniorTasks);
    } catch (e) {
      next(e);
    }
  },

  async volunteerAcceptTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const taskId = parseInt(req.params.id);
      const responderId = parseInt(req.body.responderId);
      const acceptedTask = await Tasks.volunteerAcceptTask(taskId, responderId);
      return res.status(201).json(acceptedTask);
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
      const declinedTask = await Tasks.volunteerCancelTask(taskId);
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
      const fetchedTasks = await Tasks.volunteerGetSeniorTasks(seniorId);
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
      const fetchedAcceptedTasks = await Tasks.volunteerGetAcceptedTasks();
      return res.status(201).json(fetchedAcceptedTasks);
    } catch (e) {
      next(e);
    }
  },

  async volunteerGetIndividualAcceptedTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const responderId = parseInt(req.params.id);
      const fetchedVolunteerIndividualTasks =
        await Tasks.volunteerGetIndividualAcceptedTasks(responderId);
      return res.status(201).json(fetchedVolunteerIndividualTasks);
    } catch (e) {
      next(e);
    }
  },
};

export default TasksController;
