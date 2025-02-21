import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthorService {
  async createAuthor(data: { name: string; birthYear: number; nationality: string }) {
    return prisma.author.create({
      data: {
        name: data.name,
        birthYear: data.birthYear,
        nationality: data.nationality,
      },
    });
  }

  async getAuthorById(id: string) {
    return prisma.author.findUnique({
      where: { id },
      include: { books: true }, 
    });
  }

  async getAuthors() {
    return prisma.author.findMany();
  }

  async updateAuthor(id: string, data: { name?: string; birthYear?: number; nationality?: string }) {
    return prisma.author.update({
      where: { id },
      data,
    });
  }

  async deleteAuthor(id: string) {
    return prisma.author.delete({
      where: { id },
    });
  }
}

export default new AuthorService();
