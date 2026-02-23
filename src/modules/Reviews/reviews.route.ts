import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ReviewsController } from "./reviews.controller";

const router = express.Router();

router.post("/", auth(UserRole.student), ReviewsController.createReview);

router.get("/tutor/:tutorId", ReviewsController.getTutorReviews);

router.patch("/:id", auth(UserRole.student), ReviewsController.updateReview);

export const ReviewsRoutes = router;
