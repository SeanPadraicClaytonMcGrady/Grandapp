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
    location: string
  ): Promise<Task> {
    const emotionalTask = await prismaInstance.task.create({
      data: {
        author: { connect: { id: authorId } },
        type: "EMOTIONAL",
        description,
        location,
      },
      include: {
        author: true,
      },
    });
    return emotionalTask;
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
