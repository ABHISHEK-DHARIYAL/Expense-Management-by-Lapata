// prisma/seed.js
import prisma from "../src/config/db.js"; // <- Make sure this path is correct
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  const company = await prisma.company.create({
    data: { name: "Default Company", country: "USA", default_currency: "USD" },
  });

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password_hash: passwordHash,
      role: "Admin",
      company_id: company.id,
    },
  });

  console.log("Seed finished.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
