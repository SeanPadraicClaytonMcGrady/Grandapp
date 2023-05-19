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
    const tasks = await prismaInstance.task.findMany({
      include: {
        author: {
          include: {
            user: true
          }
        }
      }
    });
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

  async createEmotionalTask(
    authorName: string,
    authorId: number,
    type: string,
    description: string,
    scheduledDate: string,
    location: string
  ): Promise<Task | null> {

    const senior = await prismaInstance.senior.findFirst({
      where: {
        user: {
          username: authorName
        }
      }
    })

    if (senior) {
      try {
        const newDate = new Date(scheduledDate);
        const emotionalTask = await prismaInstance.task.create({
          data: {
            author: { connect: { id: senior.id } },
            type: "EMOTIONAL",
            description,
            scheduledDate: newDate,
            location,
          },
          include: {
            author: true,
          },
        });
        return emotionalTask;
      } catch (err) {
        console.log(err)
        return null
      }
    } return null
  },

  async createPhysicalTask(
    authorName: string,
    authorId: number,
    type: string,
    description: string,
    scheduledDate: string,
    location: string
  ): Promise<Task | null> {
    const senior = await prismaInstance.senior.findFirst({
      where: {
        user: {
          username: authorName
        }
      }
    })
    if (senior) {
      try {
        const newDate = new Date(scheduledDate);
        const physicalTask = await prismaInstance.task.create({
          data: {
            author: { connect: { id: senior.id } },
            type: "PHYSICAL",
            description,
            scheduledDate: newDate,
            location,
          },
          include: {
            author: true,
          },
        });
        return physicalTask;
      } catch (err) {
        console.log(err)
        return null
      }
    } return null
  },


  async editTask(
    taskId: number,
    description: string,
    scheduledDate: string,
    location: string
  ): Promise<Task> {
    const newDate = new Date(scheduledDate);
    const editedTask = await prismaInstance.task.update({
      where: { id: taskId },
      data: { description, scheduledDate: newDate, location },
    });
    return editedTask;
  },

  //Delete Task needs to send a message to a Volunteer notifying them of a deleted task IF they exist.
  async deleteTask(taskId: number): Promise<Task> {
    const deletedTask = await prismaInstance.task.delete({
      where: { id: taskId },
    });
    return deletedTask;
  },

  async volunteerAcceptedBySenior(
    taskId: number,
    responderId: number
  ): Promise<Task> {
    const acceptedVolunteer = await prismaInstance.task.update({
      where: { id: taskId },
      data: {
        accepted: { connect: { id: responderId } },
        responder: { disconnect: true },
      },
    });
    return acceptedVolunteer;
  },
};

export default Tasks;
