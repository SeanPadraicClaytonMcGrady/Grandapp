import express from "express";
import VolunteersController from "./controllers/volunteers.controller";
import SeniorsController from "./controllers/seniors.controller";
import UsersController from "./controllers/users.controller";
import MessagesController from "./controllers/messages.controller";
import TasksController from "./controllers/tasks.controller";

const router = express.Router();

//volunteers, seniors, users
router.post("/volunteers", VolunteersController.create);
router.post("/seniors", SeniorsController.create);
router.get("/seniors", SeniorsController.getSeniors);
router.get("/volunteers", VolunteersController.getVolunteers);
router.get("/users", UsersController.getUsers);

router.get("/seniors/username", SeniorsController.getSeniorByUsername);
router.get("/volunteers/username", VolunteersController.getVolunteerByUsername);

router.delete("/users/:id", UsersController.deleteUserById);
router.put("/users/:id", UsersController.editUserById);

//messages
router.post("/messages", MessagesController.create);
router.get("/messages/:id", MessagesController.getByUserId);
router.delete("/messages/:id", MessagesController.deleteMessageById);

//tasks

router.get("/tasks/:id", TasksController.findTaskById);
router.get("/tasks", TasksController.findAllTasks);
router.get("/seniors/tasks/open", TasksController.findSeniorTasks);
router.put("/tasks/:id/accept", TasksController.volunteerAcceptTaskById);
router.put("/tasks/:id/cancel", TasksController.volunteerCancelTaskById);
router.put(
  "/tasks/:id/confirmed",
  TasksController.volunteerConfirmedByAcceptedId
);

//Confirm this one works after merge.
router.get(
  "/seniors/:id/tasks",
  TasksController.volunteerGetSingleSeniorTasksById
);
router.get("/volunteers/tasks", TasksController.volunteerGetAcceptedTasks);

//Conirm this one works after merge.
router.get(
  "/volunteers/tasks/:id",
  TasksController.volunteerGetIndividualAcceptedTasks
);
router.post("/emotionalTasks", TasksController.newEmotionalTask);
router.post("/physicalTasks", TasksController.newPhysicalTask);
router.put("/tasks/:id", TasksController.editTaskById);
router.delete("/tasks/:id", TasksController.deleteTaskById);

export default router;
