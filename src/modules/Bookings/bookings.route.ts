import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { BookingsController } from "./bookings.controller";

const router = express.Router();

router.post("/", auth(UserRole.student), BookingsController.createBooking);

router.get(
  "/",
  auth(UserRole.student, UserRole.tutor),
  BookingsController.getUserBookings,
);

router.get(
  "/:id",
  auth(UserRole.student, UserRole.tutor),
  BookingsController.getBookingById,
);

router.patch(
  "/:id",
  auth(UserRole.student, UserRole.tutor),
  BookingsController.updateBookingStatus,
);

export const BookingsRoutes = router;
