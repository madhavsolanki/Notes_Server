import express from "express";
import {
  createNoteController,
  deleteNoteController,
  getNotesController,
  updateNoteController,
} from "../controllers/note.controller.js";
import authenticateUser from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.route("/").get(authenticateUser, getNotesController);

router.route("/").post(authenticateUser, createNoteController);

router.route("/:id").delete(authenticateUser, deleteNoteController);

router.route("/:id").put(authenticateUser, updateNoteController);

export default router;
