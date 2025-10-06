// src/seedAdmin.ts
import bcrypt from "bcryptjs";
import { prisma } from "../config/db";


export const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "Admin";

  if (!adminEmail || !adminPassword) {
    console.error("❌ ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env");
    return;
  }

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists. Skipping seeding.");
    return;
  }

  // Hash password
 
  const hashedPassword = await bcrypt.hash(adminPassword, Number(process.env.BCRYPT_SALT_ROUND));

  // Create admin user
  await prisma.user.create({
    data: {
      name:process.env.ADMIN_NAME as string ,
      email: process.env.ADMIN_EMAIL as string,
      password: hashedPassword,
      role: "ADMIN",
      phone: "0000000000", // placeholder or from .env if needed
    },
  });

  console.log("🎉 Admin user seeded successfully!");
};
