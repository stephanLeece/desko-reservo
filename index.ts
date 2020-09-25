import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
  const allDesks = await prisma.desk.findMany({
    include: {
      Employee: true,
    },
  })
  console.dir(allDesks, { depth: null })
}
main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })