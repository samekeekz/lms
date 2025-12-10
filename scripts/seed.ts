const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Math" },
        { name: "Critical Thinking" },
        { name: "English" },
      ],
    });

    console.log("Seeding successful!");
  } catch (error) {
    console.log("Error seeding database: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
