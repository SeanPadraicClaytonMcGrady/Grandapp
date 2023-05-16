import { Task, PrismaClient, User, Senior } from "@prisma/client";

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

  async createEmotionalTask(
    author: Senior,
    authorId: number,
    type: string,
    description: string,
    scheduledDate: string,
    location: string
  ): Promise<Task> {
    const newDate = new Date(scheduledDate);
    const emotionalTask = await prismaInstance.task.create({
      data: {
        author: { connect: { id: authorId } },
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
  },

  async createPhysicalTask(
    author: Senior,
    authorId: number,
    type: string,
    description: string,
    scheduledDate: string,
    location: string
  ): Promise<Task> {
    const newDate = new Date(scheduledDate);
    const physicalTask = await prismaInstance.task.create({
      data: {
        author: { connect: { id: authorId } },
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
