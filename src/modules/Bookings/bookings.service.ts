import { prisma } from "../../lib/prisma";

const createBooking = async (payload: any) => {
  const booking = await prisma.booking.create({
    data: {
      ...payload,
      status: "CONFIRMED",
    },
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      tutor: {
        select: { id: true, name: true, email: true },
      },
      category: true,
    },
  });

  return booking;
};

const getUserBookings = async (userId: string, role: string) => {
  const where: any = {};

  if (role === "STUDENT") {
    where.studentId = userId;
  } else if (role === "TUTOR") {
    where.tutorId = userId;
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      student: {
        select: { id: true, name: true, email: true, avatar: true },
      },
      tutor: {
        select: { id: true, name: true, email: true, avatar: true },
      },
      category: true,
      review: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return bookings;
};

const getBookingById = async (id: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      student: {
        select: { id: true, name: true, email: true, avatar: true },
      },
      tutor: {
        select: { id: true, name: true, email: true, avatar: true },
      },
      category: true,
      review: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found!");
  }

  return booking;
};

const updateBookingStatus = async (id: string, status: string) => {
  const booking = await prisma.booking.update({
    where: { id },
    data: { status: status as any },
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      tutor: {
        select: { id: true, name: true, email: true },
      },
      category: true,
    },
  });

  return booking;
};

export const BookingsService = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
};
