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

export const BookingsService = {
  createBooking,
};
