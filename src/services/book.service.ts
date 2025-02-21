import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BookService {
  async createBook(data: { title: string; authorId: string; yearPublished: number; description: string; genre: string }) {
    return prisma.book.create({
      data: {
        title: data.title,
        authorId: data.authorId,
        yearPublished: data.yearPublished,
        description: data.description,
        genre: data.genre,
      },
      include: {
        author: true,
      },
    });
  }


  async getBookById(id: string) {
    return prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async getBooks() {
    return prisma.book.findMany({
      include: {
        author: true,
      },
    });
  }

  async getLendedBooks() {
    return prisma.book.findMany({
      where: { isLended: true },
      include: {
        author: true,
      },
    });
  }

  async getNotLendedBooks() {
    return prisma.book.findMany({
      where: { isLended: false },
    });
  }

  async updateBook(id: string, data: { title?: string; authorId?: string; yearPublished?: number; description?: string; genre?: string }) {
    return prisma.book.update({
      where: { id },
      data,
    });
  }

  async deleteBook(id: string) {
    return prisma.book.delete({
      where: { id },
    });
  }
}

export default new BookService();
