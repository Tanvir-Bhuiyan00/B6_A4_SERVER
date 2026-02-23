import { prisma } from "../../lib/prisma";

const createReview = async (payload: any) => {
  const { bookingId, studentId, tutorId, rating, comment } = payload;

  const existingReview = await prisma.review.findUnique({
    where: { bookingId },
  });

  if (existingReview) {
    throw new Error("Review already exists for this booking!");
  }

  const review = await prisma.review.create({
    data: {
      bookingId,
      studentId,
      tutorId,
      rating,
      comment,
    },
    include: {
      student: {
        select: { id: true, name: true, avatar: true },
      },
      tutor: {
        select: { id: true, name: true },
      },
      booking: true,
    },
  });

  const tutorReviews = await prisma.review.findMany({
    where: { tutorId },
  });

  const averageRating =
    tutorReviews.reduce((sum, r) => sum + r.rating, 0) / tutorReviews.length;

  await prisma.tutorProfile.update({
    where: { userId: tutorId },
    data: {
      averageRating,
      totalReviews: tutorReviews.length,
    },
  });

  return review;
};

const getTutorReviews = async (tutorId: string) => {
  const reviews = await prisma.review.findMany({
    where: { tutorId },
    include: {
      student: {
        select: { id: true, name: true, avatar: true },
      },
      booking: {
        select: { id: true, sessionDate: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews;
};

const updateReview = async (id: string, payload: any) => {
  const review = await prisma.review.update({
    where: { id },
    data: payload,
    include: {
      student: {
        select: { id: true, name: true, avatar: true },
      },
      booking: true,
    },
  });

  const tutorReviews = await prisma.review.findMany({
    where: { tutorId: review.tutorId },
  });

  const averageRating =
    tutorReviews.reduce((sum, r) => sum + r.rating, 0) / tutorReviews.length;

  await prisma.tutorProfile.update({
    where: { userId: review.tutorId },
    data: {
      averageRating,
      totalReviews: tutorReviews.length,
    },
  });

  return review;
};

export const ReviewsService = {
  createReview,
  getTutorReviews,
  updateReview,
};
