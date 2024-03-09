import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  try {
    console.log('seed started successfully...');
    await prisma.users_Roles.create({
      data: {
        roleName: 'Admin'
      }
    });
    console.log('seed completed successfully...');
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw e;
    }
  }
};

main();
