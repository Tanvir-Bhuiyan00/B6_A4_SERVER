import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash(`${process.env.ADMIN_PASSWORD}`, 8);

  const adminData = {
    name: "Admin",
    email: `${process.env.ADMIN_EMAIL}`,
    role: UserRole.admin,
    password: hashedPassword,
  };

  try {
    const isExists = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (isExists) {
      console.log("Admin already exists!!");
      return;
    }
    const admin = await prisma.user.create({
      data: adminData,
    });
    console.log("Admin created successfully!!");
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
seedAdmin();
