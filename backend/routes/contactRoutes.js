import express from "express";
import ContactController from "../controllers/contactController.js";

const router = express.Router();

//^ Create Contact Route
router.post("/", ContactController.createContact);

//^ Get All Contacts Route
router.get("/", ContactController.getAllContacts);

//^ Get Contact by ID Route
router.get("/:id", ContactController.getContactById);

//^ Update Contact by ID Route
router.put("/:id", ContactController.updateContact);

//^ Delete Contact by ID Route
router.delete("/:id", ContactController.deleteContact);

//^ Lock Contact by ID Route
router.put("/:id/lock", ContactController.lockContact);

//^ Unlock Contact by ID Route
router.put("/:id/unlock", ContactController.unlockContact);

export default router;
