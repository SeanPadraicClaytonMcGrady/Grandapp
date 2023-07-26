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

const includeVolunteer = {
  accepted: {
    select: {
      user: {
        select: {
          username: true,
        },
      },
    },
  },
};

const includeResponses = {
  responses: {
    select: {
      responderId: true,
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
        responses: {
          include: {
            responder: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    if (!task) {
      throw new Error("Task does not exist.");
    }
    return task;
  },

  // List all seniors tasks that 0 volunteers applied

  // List all the seniors task that have not been accepted
  // ordered by number of applications (ascending)
  async findAllTasks(): Promise<any> {
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

  // async createPhysicalTask(
  //   authorName: string,
  //   authorId: number,
  //   type: string,
  //   description: string,
  //   scheduledDate: string,
  //   location: string
  // ): Promise<Task | null> {
  //   console.log(scheduledDate, typeof scheduledDate);
  //   const senior = await prismaInstance.senior.findFirst({
  //     where: {
  //       user: {
  //         username: authorName,
  //       },
  //     },
  //   });
  //   if (senior) {
  //     try {
  //       const newDate = new Date(scheduledDate);
  //       const physicalTask = await prismaInstance.task.create({
  //         data: {
  //           author: { connect: { id: senior.id } },
  //           type: "PHYSICAL",
  //           description,
  //           scheduledDate: newDate,
  //           location,
  //         },
  //         include: {
  //           author: true,
  //         },
  //       });
  //       return physicalTask;
  //     } catch (err) {
  //       console.log(err);
  //       return null;
  //     }
  //   }
  //   return null;
  // },

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

  async accept(taskId: number, responderIds: number[]): Promise<Task> {
    const updatedTask = await prismaInstance.task.update({
      where: { id: taskId },
      data: {
        accepted: {
          connect: { id: responderIds[0] },
        },
      },
    });
    return updatedTask;
  },

  //Need boolean check for user identity in functions below:
  //volunteer: true or false?
  //This is a helper function to make the boolean check.
  async isVolunteer(userId: number): Promise<boolean> {
    const user = await prismaInstance.user.findUnique({
      where: { id: userId },
      include: { volunteer: true },
    });

    return !!user?.volunteer;
  },

  // Get tasks that have no response from me
  //Get tasks that have no responses (volunteers) for me (senior)
  async getOpenTasks(id: number): Promise<Task[]> {
    const isUserVolunteer = await this.isVolunteer(id);
    if (isUserVolunteer) {
      const openTasksVolunteer = await prismaInstance.task.findMany({
        where: {
          responses: {
            none: {
              responderId: id,
            },
          },
        },
        include: { ...includeAuthor, ...includeResponses },
      });
      return openTasksVolunteer;
    }

    const openTasksSenior = await prismaInstance.task.findMany({
      where: {
        authorId: id,
        acceptedId: null,
        responses: {
          none: {},
        },
      },
      include: { ...includeAuthor, ...includeResponses },
    });
    return openTasksSenior;
  },

  // Get tasks that have a response from me (volunteer) but not accepted by senior
  //Get tasks that have a response for them (volunteers) but not accepted by me (senior)
  async getPendingTasks(id: number): Promise<Task[]> {
    const isUserVolunteer = await this.isVolunteer(id);
    if (isUserVolunteer) {
      const pendingTasksVolunteer = await prismaInstance.task.findMany({
        where: {
          responses: {
            some: {
              responderId: id,
            },
          },
          accepted: null,
        },
        include: { ...includeAuthor, ...includeResponses },
      });
      return pendingTasksVolunteer;
    }
    const pendingTasksSenior = await prismaInstance.task.findMany({
      where: {
        authorId: id,
        acceptedId: null,
        responses: {
          some: {
            responderId: { not: 0 },
          },
        },
      },
      include: { ...includeAuthor, ...includeResponses },
    });
    return pendingTasksSenior;
  },

  //Get tasks that are confirmed & scheduled (senior & volunteer)
  async getToDoTasks(id: number): Promise<Task[]> {
    const isUserVolunteer = await this.isVolunteer(id);
    if (isUserVolunteer) {
      const volunteerToDoTasks = await prismaInstance.task.findMany({
        where: { acceptedId: id },
        include: { ...includeAuthor, ...includeResponses },
      });
      if (!isUserVolunteer) {
        throw new Error("Task does not exist");
      }
      return volunteerToDoTasks;
    }
    const seniorToDoTasks = await prismaInstance.task.findMany({
      where: {
        authorId: id,
        acceptedId: { gt: 0 },
      },
      include: { ...includeAuthor, ...includeResponses },
    });
    return seniorToDoTasks;
  },
};

export default Tasks;
