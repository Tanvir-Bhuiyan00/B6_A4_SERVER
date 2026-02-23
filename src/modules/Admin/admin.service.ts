import { prisma } from "../../lib/prisma";

const getAllUsers = async (filters: any) => {
  const { role, search } = filters;

  const where: any = {};

  if (role) {
    where.role = role.toUpperCase();
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const users = await prisma.user.findMany({
    where,
    include: {
      tutorProfile: true,
      studentBookings: { select: { id: true } },
      tutorBookings: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return users;
};

const updateUserStatus = async (userId: string, isBanned: boolean) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isBanned },
    include: {
      tutorProfile: true,
    },
  });

  return user;
};

const getAllBookings = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      tutor: {
        select: { id: true, name: true, email: true },
      },
      category: true,
      review: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return bookings;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return categories;
};

const createCategory = async (payload: any) => {
  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

const updateCategory = async (id: string, payload: any) => {
  const category = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return category;
};

const deleteCategory = async (id: string) => {
  await prisma.category.delete({
    where: { id },
  });

  return { message: "Category deleted successfully" };
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
