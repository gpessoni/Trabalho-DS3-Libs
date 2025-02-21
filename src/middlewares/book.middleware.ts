import { Request, Response, NextFunction } from "express";
import bookService from "../services/book.service";

export const validateBookExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.id;
  const existingBook = await bookService.getBookById(bookId);

  if (!existingBook) {
    return res.status(404).json({ message: "Sport não encontrada." });
  }
  next();
};

