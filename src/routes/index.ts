import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";
import { TutorPublicRoutes } from "../modules/Tutor/tutorPublic.route";
import { BookingsRoutes } from "../modules/Bookings/bookings.route";
import { AdminRoutes } from "../modules/Admin/admin.route";

const router = Router();

const routerManger = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/tutor",
    route: TutorRoutes,
  },
  {
    path: "/tutors",
    route: TutorPublicRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/bookings",
    route: BookingsRoutes,
  },
];

routerManger.forEach((r) => router.use(r.path, r.route));

export default router;
