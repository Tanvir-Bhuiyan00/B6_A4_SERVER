import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/users", auth(UserRole.admin), AdminController.getAllUsers);

router.patch(
  "/users/:id",
  auth(UserRole.admin),
  AdminController.updateUserStatus,
);

router.get("/bookings", auth(UserRole.admin), AdminController.getAllBookings);

router.get(
  "/categories",
  auth(UserRole.admin),
  AdminController.getAllCategories,
);

router.post(
  "/categories",
  auth(UserRole.admin),
  AdminController.createCategory,
);

router.put(
  "/categories/:id",
  auth(UserRole.admin),
  AdminController.updateCategory,
);

router.delete(
  "/categories/:id",
  auth(UserRole.admin),
  AdminController.deleteCategory,
);

export const AdminRoutes = router;
