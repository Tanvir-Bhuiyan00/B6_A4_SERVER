import { Router } from "express";
import { TutorController } from "./tutor.controller";

const router = Router();

// Public Routes
router.get("/", TutorController.getAllTutors);
router.get("/:id", TutorController.getTutorById);

export const TutorPublicRoutes = router;
