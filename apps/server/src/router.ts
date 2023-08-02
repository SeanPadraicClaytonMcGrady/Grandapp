import express from "express";
import VolunteersController from "./controllers/volunteers.controller";
import SeniorsController from "./controllers/seniors.controller";
import UsersController from "./controllers/users.controller";
import MessagesController from "./controllers/messages.controller";
import TasksController from "./controllers/tasks.controller";
import authMiddleware from "./middlewares/authentication";

const router = express.Router();
router.post("/login", UsersController.loginUser);

const authRouter = express.Router();
authRouter.use(authMiddleware);
router.use(authRouter);

authRouter.post("/volunteers", VolunteersController.create);
authRouter.post("/seniors", SeniorsController.create);
authRouter.get("/seniors", SeniorsController.getSeniors);
authRouter.get("/volunteers", VolunteersController.getVolunteers);
authRouter.get("/users", UsersController.getUsers);
authRouter.get(
  "/seniors/username",
  authMiddleware,
  SeniorsController.getSeniorByUsername
);
authRouter.get(
  "/volunteers/username",
  authMiddleware,
  VolunteersController.getVolunteerByUsername
);

authRouter.delete("/users/:id", UsersController.deleteUserById);
authRouter.put("/users/:id", UsersController.editUserById);

// router.post("/uploadphoto", upload.single("file"), UsersController.uploadPhoto);

//messages
authRouter.post("/messages", MessagesController.create);
authRouter.get("/messages/:id", MessagesController.getByUserId);
authRouter.delete("/messages/:id", MessagesController.deleteMessageById);

//tasks

authRouter.get("/tasks/:id", TasksController.findTaskById);
authRouter.get("/tasks", TasksController.findAllTasks);

authRouter.get("/relevant-tasks", TasksController.getRelevantTasks);
authRouter.put("/tasks/:id", TasksController.createResponse);
authRouter.put("/tasks/:id/cancel", TasksController.volunteerCancelTaskById);

authRouter.get(
  "/seniors/:id/tasks",
  TasksController.volunteerGetSingleSeniorTasksById
);

authRouter.get("/volunteers/tasks", TasksController.volunteerGetAcceptedTasks);

authRouter.post("/emotionalTasks", TasksController.newEmotionalTask);
authRouter.post("/physicalTasks", TasksController.newPhysicalTask);
authRouter.put("/tasks/:id/", TasksController.editTaskById);

authRouter.put(
  "/tasks/:id/accept",
  TasksController.volunteerConfirmedByAcceptedId
);
authRouter.delete("/tasks/:id", TasksController.deleteTaskById);
export default router;
