import { Request, Response } from "express";
import bookService from "../services/book.service";

import authorService from "../services/author.service";
import { handleError } from "../utils/errorHandler";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BookController {
  async create(req: Request, res: Response) {
    const { title, authorId, isbn, yearPublished, description, genre } = req.body;
    if (!title || !authorId || !isbn || !yearPublished || !description || !genre)
      return handleError(res, new Error("Required data not provided."), "Validation Error", 400);

    const authorExists = await authorService.getAuthorById(authorId);
    if (!authorExists)
      return handleError(
        res,
        new Error("Author not found."),
        "Author not found",
        404
      );

    try {
      const book = await bookService.createBook({ title, authorId, isbn, yearPublished, description, genre });
      return res.status(201).json(book);
    } catch (err) {
      return handleError(res, err as Error, "Error creating the book.");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const books = await bookService.getBooks();
      return res.json(books);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching books.");
    }
  }

  async listLended(req: Request, res: Response) {
    try {
      const lendedBooks = await bookService.getLendedBooks();
      return res.json(lendedBooks);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching lended books.");
    }
  }

  async listNotLended(req: Request, res: Response) {
    try {
      const notLendedBooks = await bookService.getNotLendedBooks();
      return res.json(notLendedBooks);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching not lended books.");
    }
  }

  async update(req: Request, res: Response) {
    const { title, authorId, isbn, yearPublished, description, genre } = req.body;
    try {
      const updatedBook = await bookService.updateBook(req.params.id, {
        title,
        authorId,
        isbn,
        yearPublished,
        description,
        genre,
      });
      return res.json(updatedBook);
    } catch (err) {
      return handleError(res, err as Error, "Error updating the book.");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const book = await bookService.getBookById(req.params.id);
      if (!book) return handleError(res, new Error("Book not found."), "Not Found", 404);
      return res.json(book);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching the book.");
    }
  }


  async delete(req: Request, res: Response) {
    if (!req.params.id) {
      return handleError(res, new Error("ID not provided."), "Validation Error", 400);
    }

    const bookExists = await bookService.getBookById(req.params.id);

    if (!bookExists) {
      return handleError(
        res,
        new Error("Book not found."),
        "Book not found",
        404
      );
    }


    try {
      await bookService.deleteBook(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return handleError(res, err as Error, "Error deleting the book.");
    }
  }
}


export default new BookController();
