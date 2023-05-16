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

  async newEmotionalTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { author, authorId, type, description, scheduledDate, location } =
        req.body;
      const emotionalTask = await Tasks.createEmotionalTask(
        author,
        authorId,
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
      const { author, authorId, type, description, scheduledDate, location } =
        req.body;
      const physicalTask = await Tasks.createPhysicalTask(
        author,
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
};

export default TasksController;
