import {
  Task,
  PrismaClient,
  Response,
  User,
  Senior,
  Volunteer,
  Prisma,
} from "@prisma/client";
import { get } from "http";
const prismaInstance = new PrismaClient();

const includeAuthor = {
  author: {
    select: {
      user: {
        select: {
          username: true,
        },
      },
    },
  },
};

const Tasks = {
  async findTask(taskId: number): Promise<Task> {
    const task = await prismaInstance.task.findUnique({
      where: { id: taskId },
      include: {
        author: {
          include: { user: true },
        },
      },
    });
    if (!task) {
      throw new Error("Task does not exist.");
    }
    return task;
  },

  // Return to this ASAP

  // `SELECT * FROM "Task" WHERE
  // "Task"."responderId" IS NULL`

  // List all seniors tasks that 0 volunteers applied

  // List all the seniors task that have not been accepted
  // ordered by number of applications (ascending)
  async findAllTasks(): Promise<any> {
    // const searchResult = await prismaInstance.$queryRaw(
    //   Prisma.sql`SELECT "Task".*, "User"."name" AS name, CAST(count("Response"."taskId") AS INTEGER) AS "numberOfApplications"
    //   FROM "Task"
    //   INNER JOIN "Senior" ON "Senior"."id" = "Task"."authorId"
    //   INNER JOIN "User" ON "User"."id" = "Senior"."id"
    //   LEFT JOIN "Response" ON "Response"."taskId" = "Task"."id"
    //   WHERE "Task"."acceptedId" IS NULL
    //   GROUP BY "Task"."id"
    //   `
    // );

    const searchResult = await prismaInstance.$queryRaw(
      Prisma.sql`
        SELECT "Task".*, "User"."name" AS "name", CAST(COUNT("Response"."responderId") AS INTEGER) AS "numberOfApplications"
        FROM "Task"
        LEFT JOIN "Senior" ON "Senior"."id" = "Task"."authorId"
        LEFT JOIN "User" ON "User"."id" = "Senior"."id"
        LEFT JOIN "Response" ON "Response"."taskId" = "Task"."id"
        WHERE "Task"."acceptedId" IS NULL
        GROUP BY "Task"."id", "User"."name"
        `
    );
    return searchResult;
  },

  async createResponse(taskId: number, responderId: number): Promise<Response> {
    const response = await prismaInstance.response.create({
      data: {
        responder: { connect: { id: responderId } },
        task: { connect: { id: taskId } },
      },
      include: {
        task: true,
      },
    });
    return response;
  },

  async deleteResponse(taskId: number, responderId: number): Promise<Response> {
    const deletedResponse = await prismaInstance.response.delete({
      where: {
        taskId_responderId: {
          responderId: responderId,
          taskId: taskId,
        },
      },
    });
    return deletedResponse;
  },

  async getTasksBySeniorId(seniorId: number): Promise<Task[]> {
    const fetchedTasks = await prismaInstance.task.findMany({
      where: { id: seniorId },
    });
    if (!fetchedTasks) {
      throw new Error("This senior does not have tasks yet.");
    }

    return fetchedTasks;
  },

  async getAcceptedTasks(): Promise<any> {
    const searchResult = await prismaInstance.$queryRaw(
      Prisma.sql`SELECT * FROM "Task" WHERE 
      "Task"."responderId" IS NOT NULL`
    );

    return searchResult;
  },

  async getToDoTasks(responderId: number): Promise<Task[]> {
    const searchTask = await prismaInstance.task.findMany({
      where: { acceptedId: responderId },
      include: includeAuthor,
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
          username: authorName,
        },
      },
    });

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
        console.log(err);
        return null;
      }
    }
    return null;
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
          username: authorName,
        },
      },
    });
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
        console.log(err);
        return null;
      }
    }
    return null;
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

  async accept(taskId: number, responderId: number): Promise<Task> {
    const acceptedVolunteer = await prismaInstance.task.update({
      where: { id: taskId },
      data: {
        accepted: { connect: { id: responderId } },
      },
    });
    return acceptedVolunteer;
  },

  // Get tasks that have no response from me
  async getOpenTasks(volunteerId: number): Promise<Task[]> {
    const openTasks = await prismaInstance.task.findMany({
      where: {
        responses: {
          none: {
            responderId: volunteerId,
          },
        },
      },
      include: includeAuthor,
    });
    return openTasks;
  },

  // Get tasks that have a response from me but not accepted by senior
  async getPendingTasks(volunteerId: number): Promise<Task[]> {
    const pendingTasks = await prismaInstance.task.findMany({
      where: {
        responses: {
          some: {
            responderId: volunteerId,
          },
        },
        accepted: null,
      },
      include: includeAuthor,
    });
    return pendingTasks;
  },
};

export default Tasks;
