import { prisma } from "../../lib/prisma";

const getAllTutors = async (filters: any) => {
  const { subject, minPrice, maxPrice, sortBy } = filters;

  const where: any = {};

  if (subject) {
    where.tutorProfile = {
      subjects: {
        contains: subject,
      },
    };
  }

  if (minPrice || maxPrice) {
    where.tutorProfile = {
      ...where.tutorProfile,
      hourlyRate: {
        ...(minPrice && { gte: parseFloat(minPrice) }),
        ...(maxPrice && { lte: parseFloat(maxPrice) }),
      },
    };
  }

  const orderBy: any = {};
  if (sortBy === "rating") {
    orderBy.tutorProfile = { averageRating: "desc" };
  } else if (sortBy === "price") {
    orderBy.tutorProfile = { hourlyRate: "asc" };
  }

  const tutors = await prisma.user.findMany({
    where: {
      role: "TUTOR",
      isBanned: false,
      tutorProfile: where.tutorProfile,
    },
    include: {
      tutorProfile: true,
    },
    orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
  });

  return tutors;
};

const getTutorById = async (id: string) => {
  const tutor = await prisma.user.findUnique({
    where: { id, role: "TUTOR" },
    include: {
      tutorProfile: true,
      tutorReviews: {
        include: {
          student: {
            select: { id: true, name: true, avatar: true },
          },
        },
      },
    },
  });

  if (!tutor) {
    throw new Error("Tutor not found!");
  }

  return tutor;
};

const updateTutorProfile = async (userId: string, payload: any) => {
  const tutorProfile = await prisma.tutorProfile.upsert({
    where: { userId },
    update: {
      ...payload,
    },
    create: {
      userId,
      ...payload,
    },
    include: {
      user: true,
    },
  });

  return tutorProfile;
};

const updateTutorAvailability = async (
  userId: string,
  availabilityInfo: string,
) => {
  const tutorProfile = await prisma.tutorProfile.upsert({
    where: { userId },
    update: { availabilityInfo },
    create: {
      userId,
      availabilityInfo,
    },
  });

  return tutorProfile;
};

export const TutorService = {
  getAllTutors,
  getTutorById,
  updateTutorProfile,
  updateTutorAvailability,
};
