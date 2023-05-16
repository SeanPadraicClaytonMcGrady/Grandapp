import {
  Task,
  PrismaClient,
  User,
  Senior,
  Volunteer,
  Prisma,
} from "@prisma/client";
import { number } from "prop-types";

const prismaInstance = new PrismaClient();

//Random note: If Typescript says || null, consider throwing an error.

const Tasks = {
  async findTask(taskId: number): Promise<Task> {
    const task = await prismaInstance.task.findUnique({
      where: { id: taskId },
    });
    if (!task) {
      throw new Error("Task does not exist.");
    }
    return task;
  },

  async findAllTasks(): Promise<Task[]> {
    const tasks = await prismaInstance.task.findMany();
    if (!tasks) {
      throw new Error("There are no tasks.");
    }
    return tasks;
  },

  // Return to this ASAP

  async findAllSeniorTasks(): Promise<any> {
    const searchResult = await prismaInstance.$queryRaw(
      Prisma.sql`SELECT * FROM "Task" WHERE 
      "Task"."responderId" IS NULL`
    );

    return searchResult;

    console.log(searchResult);
  },

  async volunteerAcceptTask(
    taskId: number,
    responderId: number
  ): Promise<Task> {
    const updatedTask = await prismaInstance.task.update({
      where: { id: taskId },
      data: { responder: { connect: { id: responderId } } },
    });
    return updatedTask;
  },

  async volunteerCancelTask(taskId: number): Promise<Task> {
    const updatedTask = await prismaInstance.task.update({
      where: { id: taskId },
      data: { responder: { disconnect: true } },
    });
    return updatedTask;
  },

  async volunteerGetSeniorTasks(seniorId: number): Promise<Task[]> {
    const fetchedTasks = await prismaInstance.task.findMany({
      where: { id: seniorId },
    });
    if (!fetchedTasks) {
      throw new Error("This senior does not have tasks yet.");
    }

    return fetchedTasks;
  },

  async volunteerGetAcceptedTasks(): Promise<any> {
    const searchResult = await prismaInstance.$queryRaw(
      Prisma.sql`SELECT * FROM "Task" WHERE 
      "Task"."responderId" IS NOT NULL`
    );

    return searchResult;
  },

  async volunteerGetIndividualAcceptedTasks(
    responderId: number
  ): Promise<Task[]> {
    const searchTask = await prismaInstance.task.findMany({
      where: { responderId: responderId },
    });
    if (!searchTask) {
      throw new Error("Task does not exist");
    }
    return searchTask;
  },
};

// author        Senior?    @relation("author", fields: [authorId], references: [id], onDelete: SetNull)
// authorId      Int?
// responder     Volunteer? @relation("responder", fields: [responderId], references: [id], onDelete: SetNull)
// responderId   Int?
// type          TaskType   @default(EMOTIONAL)
// description   String
// creationDate  DateTime   @default(now())
// scheduledDate DateTime   @default(now())
// location      String

export default Tasks;
