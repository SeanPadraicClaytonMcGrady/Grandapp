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

//volunteers, seniors, users
router.post("/volunteers", VolunteersController.create);
router.post("/seniors", SeniorsController.create);
router.get("/seniors", SeniorsController.getSeniors);
router.get("/volunteers", VolunteersController.getVolunteers);
router.get("/users", UsersController.getUsers);
router.get(
  "/seniors/username",
  authMiddleware,
  SeniorsController.getSeniorByUsername
);
router.get(
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

router.get("/tasks/:id", TasksController.findTaskById);
router.get("/tasks", TasksController.findAllTasks);

authRouter.get("/relevant-tasks", TasksController.getRelevantTasks);
authRouter.put("/tasks/:id", TasksController.createResponse);
authRouter.put("/tasks/:id/cancel", TasksController.volunteerCancelTaskById);

//Confirm this one works after merge.
authRouter.get(
  "/seniors/:id/tasks",
  TasksController.volunteerGetSingleSeniorTasksById
);

authRouter.get("/volunteers/tasks", TasksController.volunteerGetAcceptedTasks);

//Conirm this one works after merge.
router.post("/emotionalTasks", TasksController.newEmotionalTask);
router.post("/physicalTasks", TasksController.newPhysicalTask);
authRouter.put("/tasks/:id", TasksController.editTaskById);
authRouter.delete("/tasks/:id", TasksController.deleteTaskById);
export default router;
