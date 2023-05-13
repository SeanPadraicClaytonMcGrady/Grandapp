import express from "express";
import VolunteersController from "./controllers/volunteers.controller";
import SeniorsController from "./controllers/seniors.controller";
import UsersController from "./controllers/users.controller";
import MessagesController from "./controllers/messages.controller";

const router = express.Router();

router.post("/volunteers", VolunteersController.create);
router.post("/seniors", SeniorsController.create);
router.get("/seniors", SeniorsController.getSeniors);
router.get("/volunteers", VolunteersController.getVolunteers);
router.get("/users", UsersController.getUsers);

router.get("/seniors/username", SeniorsController.getSeniorByUsername);
router.get("/volunteers/username", VolunteersController.getVolunteerByUsername);

router.delete("/users/:id", UsersController.deleteUserById);

router.put("/users/:id", UsersController.editUserById);

router.post("/messages", MessagesController.create);
router.get("/messages/:id", MessagesController.getByUserId);
router.delete("/messages/:id", MessagesController.deleteMessageById);

export default router;
