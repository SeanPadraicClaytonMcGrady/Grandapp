import express from "express";
import VolunteersController from "./controllers/volunteers.controller";
import SeniorsController from "./controllers/seniors.controller";
import UsersController from "./controllers/users.controller";

const router = express.Router();

router.post("/volunteers", VolunteersController.create);
router.post("/seniors", SeniorsController.create);
router.get("/seniors", SeniorsController.getSeniors);
router.get("/volunteers", VolunteersController.getVolunteers);
router.get("/users", UsersController.getUsers);

router.get("/seniors/username", SeniorsController.getSeniorByUsername);
router.get("/volunteers/username", VolunteersController.getVolunteerByUsername);

router.delete("/seniors/username", SeniorsController.deleteSeniorByUsername);

export default router;
