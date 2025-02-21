import { Request, Response } from "express";
import loanService from "../services/loan.service";
import { handleError } from "../utils/errorHandler";

class LoanController {
  async create(req: Request, res: Response) {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return handleError(res, new Error("Required data not provided."), "Validation Error", 400);
    }

    try {
      const loan = await loanService.createLoan(userId, bookId);
      return res.status(201).json(loan);
    } catch (err) {
      return handleError(res, err as Error, "Error creating the loan.");
    }
  }

  async return(req: Request, res: Response) {
    const { loanId } = req.body;

    if (!loanId) {
      return handleError(res, new Error("Loan ID is required."), "Validation Error", 400);
    }

    try {
      const returnedLoan = await loanService.returnLoan(loanId);
      return res.json(returnedLoan);
    } catch (err) {
      return handleError(res, err as Error, "Error returning the loan.");
    }
  }

  async getCurrent(req: Request, res: Response) {
    try {
      const loans = await loanService.getCurrentLoans();
      return res.json(loans);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching current loans.");
    }
  }

  async getByBook(req: Request, res: Response) {
    const { bookId } = req.params;

    try {
      const loanHistory = await loanService.getLoanHistoryByBook(bookId);
      return res.json(loanHistory);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching loan history for the book.");
    }
  }

  async getByUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const userLoans = await loanService.getLoansByUser(userId);
      return res.json(userLoans);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching loans for the user.");
    }
  }
}

export default new LoanController();
