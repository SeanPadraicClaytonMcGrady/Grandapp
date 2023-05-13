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
      const { author, authorId, type, description, location } = req.body;
      const emotionalTask = await Tasks.createEmotionalTask(
        author,
        authorId,
        type,
        description,
        location
      );
      res.status(201).json(emotionalTask);
    } catch (e) {
      next(e);
    }
  },
};

export default TasksController;
