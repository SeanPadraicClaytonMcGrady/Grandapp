import express from "express";
import VolunteersController from "./controllers/volunteers.controller";
import SeniorsController from "./controllers/seniors.controller";
import UsersController from "./controllers/users.controller";
import MessagesController from "./controllers/messages.controller";
import TasksController from "./controllers/tasks.controller";
import authentication from "./middlewares/authentitcation";
import { ensureSenior, ensureVolunteer } from "./middlewares/ensureRoles";
import authMiddleware from "./middlewares/authoritzation";

const router = express.Router();

const authRouter = express.Router();
authRouter.use(authentication)

const seniorRouter = express.Router();
seniorRouter.use(ensureSenior)

const volunteerRouter = express.Router();
volunteerRouter.use(ensureVolunteer)

//volunteers, seniors, users
router.post("/volunteers", VolunteersController.create);
router.post("/seniors", SeniorsController.create);
router.get("/seniors", SeniorsController.getSeniors);
router.get("/volunteers", VolunteersController.getVolunteers);
router.get("/users", UsersController.getUsers);

router.post("/login", UsersController.loginUser)
router.get("/seniors/username", authMiddleware, SeniorsController.getSeniorByUsername);
router.get("/volunteers/username", authMiddleware, VolunteersController.getVolunteerByUsername);

authRouter.delete("/users/:id", UsersController.deleteUserById);
authRouter.put("/users/:id", UsersController.editUserById);

//messages
authRouter.post("/messages", MessagesController.create);
authRouter.get("/messages/:id", MessagesController.getByUserId);
authRouter.delete("/messages/:id", MessagesController.deleteMessageById);

//tasks

router.get("/tasks/:id", TasksController.findTaskById);
router.get("/tasks", TasksController.findAllTasks);
volunteerRouter.get("/relevant-tasks", TasksController.getRelevantTasks);
volunteerRouter.put("/tasks/:id/response", TasksController.createResponse);
volunteerRouter.put("/tasks/:id/cancel", TasksController.volunteerCancelTaskById);

//Confirm this one works after merge.
volunteerRouter.get(
  "/seniors/:id/tasks",
  TasksController.volunteerGetSingleSeniorTasksById
);
volunteerRouter.get("/volunteers/tasks", TasksController.volunteerGetAcceptedTasks);

//Conirm this one works after merge.
seniorRouter.post("/emotionalTasks", TasksController.newEmotionalTask);
seniorRouter.post("/physicalTasks", TasksController.newPhysicalTask);
seniorRouter.put("/tasks/:id", TasksController.editTaskById);
seniorRouter.delete("/tasks/:id", TasksController.deleteTaskById);

router.use(authRouter);
router.use(seniorRouter);
router.use(volunteerRouter);

export default router;