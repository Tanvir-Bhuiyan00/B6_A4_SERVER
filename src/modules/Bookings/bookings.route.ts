import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { BookingsController } from "./bookings.controller";

const router = express.Router();

router.post("/", auth(UserRole.student), BookingsController.createBooking);

export const BookingsRoutes = router;
