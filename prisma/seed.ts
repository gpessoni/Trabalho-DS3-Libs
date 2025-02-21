import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const authors = [
        {
            name: "J.K. Rowling",
            birthYear: 1965,
            nationality: "British",
        },
        {
            name: "George Orwell",
            birthYear: 1903,
            nationality: "British",
        },
        {
            name: "Harper Lee",
            birthYear: 1926,
            nationality: "American",
        },
        {
            name: "F. Scott Fitzgerald",
            birthYear: 1896,
            nationality: "American",
        },
    ];

    await prisma.author.deleteMany();

    for (const author of authors) {
        const createdAuthor = await prisma.author.create({
            data: author,
        });
        console.log("Author created:", createdAuthor);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
