import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";
import { TutorPublicRoutes } from "../modules/Tutor/tutorPublic.route";

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
];

routerManger.forEach((r) => router.use(r.path, r.route));

export default router;
