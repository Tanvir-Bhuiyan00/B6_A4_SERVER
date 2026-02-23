import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorRoutes } from "../modules/Tutor/tutor.route";
import { TutorPublicRoutes } from "../modules/Tutor/tutorPublic.route";
import { BookingsRoutes } from "../modules/Bookings/bookings.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { ReviewsRoutes } from "../modules/Reviews/reviews.route";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
});

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

  {
    path: "/reviews",
    route: ReviewsRoutes,
  },
];

routerManger.forEach((r) => router.use(r.path, r.route));

export default router;
