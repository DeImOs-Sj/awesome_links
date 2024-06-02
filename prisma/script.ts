import { PrismaClient } from '@prisma/client'
import {links} from "../data/links"


const prisma = new PrismaClient()

async function main() {
   const user = await prisma.user.create({
        data: {
            email: "testmail@gmail.com",
            role: 'ADMIN',
        }
   })
    console.log(user)

const linksWithStringId = links.map(link => ({
        ...link,
        id: link.id.toString(),
    }));

    await prisma.link.createMany({
        data: linksWithStringId,
    });
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })