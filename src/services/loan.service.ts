import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class LoanService {
  async createLoan(userId: string, bookId: string, previewDate: Date) {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.isLended) {
      throw new Error("Book is already lent out");
    }

    const loan = await prisma.loan.create({
      data: {
        userId,
        bookId,
        previewDate,
      },
      include: {
        book: true,
        user: true,
      },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: {
        isLended: true,
      },
    });

    return loan;
  }

  async returnLoan(loanId: string) {
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: {
        book: true,
      },
    });

    if (!loan) {
      throw new Error("Loan not found");
    }

    if (loan.status === "RETURNED") {
      throw new Error("Book already returned");
    }

    const updatedLoan = await prisma.loan.update({
      where: { id: loanId },
      data: {
        returnDate: new Date(),
        status: "RETURNED",
      },
    });

    await prisma.book.update({
      where: { id: loan.bookId },
      data: {
        isLended: false,
      },
    });

    return updatedLoan;
  }

  async getCurrentLoans() {
    return prisma.loan.findMany({
      where: { status: "PENDING" },
      include: {
        book: true,
        user: true,
      },
    });
  }

  async getLoanHistoryByBook(bookId: string) {
    return prisma.loan.findMany({
      where: { bookId },
      include: {
        book: true,
        user: true,
      },
    });
  }

  async getLoansByUser(userId: string) {
    return prisma.loan.findMany({
      where: { userId },
      include: {
        book: true,
        user: true,
      },
    });
  }
}

export default new LoanService();
