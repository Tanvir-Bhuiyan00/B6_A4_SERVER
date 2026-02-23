import express from "express";
import { TutorController } from "./tutor.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

// Protected tutor routes
router.put("/profile", auth(UserRole.tutor), TutorController.updateProfile);
router.put(
  "/availability",
  auth(UserRole.tutor),
  TutorController.updateAvailability,
);

export const TutorRoutes = router;
