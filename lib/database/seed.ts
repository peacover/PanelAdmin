import { db } from "./db";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
// create 4 super admins

const INIT_ADMIN_PASSWORD = "password";
const INIT_SUPER_ADMIN_PASSWORD = "superpassword";

async function createSuperAdmin(nb: number) {
  for (let i = 0; i < nb; i++) {
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

async function createAdmin(nb: number) {
  for (let i = 0; i < nb; i++) {
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

const createBusinessAdmin = async (nb: number, userType: Role) => {
  for (let i = 0; i < nb; i++) {
    const buss_data = {
      name: faker.company.buzzNoun(),
      imageUrl: faker.image.url(),
      description: faker.lorem.paragraph(),
      // updatedAt: faker.date.recent({ days: 30 }),
      updatedAt: faker.date.soon({ days: 30 }),
    };
    const buss = await db.user.findMany({
      where: {
        role: userType,
      },
      select: {
        id: true,
      },
    });
    const updatedBuss = await db.business.create({
      data: {
        ...buss_data,
        owner: {
          connect: {
            id: buss[Math.floor(Math.random() * buss.length)].id,
          },
        },
      },
    });
  }
};

async function main() {
  Promise.all([
    // await createAdmin(10),
    await createSuperAdmin(6),
    // await createBusinessAdmin(40, Role.ADMIN),
    // await createBusinessAdmin(10, Role.SUPERADMIN),
  ]);
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
