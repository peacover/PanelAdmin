import { db } from "./db";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
// create 4 super admins

const INIT_ADMIN_PASSWORD = "password";
const INIT_SUPER_ADMIN_PASSWORD = "superpassword";

async function createSuperAdmin() {
    for (let i = 0; i < 4; i++) {
      const user = await db.user.create({
        data: {
          email: faker.internet.email(),
          password: await bcrypt.hash(INIT_SUPER_ADMIN_PASSWORD, 10),
          name: faker.person.firstName() + " " + faker.person.lastName(),
          role: Role.SUPERADMIN,
        },
      });
    }
}

// create 4 admins

async function createAdmin() {
  for (let i = 0; i < 4; i++) {
    const user = await db.user.create({
      data: {
        email: faker.internet.email(),
        password: await bcrypt.hash(INIT_ADMIN_PASSWORD, 10),
        name: faker.person.firstName() + " " + faker.person.lastName(),
        role: Role.ADMIN,
      },
    });
  }
}
async function main() {
    await createSuperAdmin();
    await createAdmin();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding done!!");
    await db.$disconnect();
  });
