import { Request, Response } from "express";
import authorService from "../services/author.service";
import { handleError } from "../utils/errorHandler";

class AuthorController {
  async create(req: Request, res: Response) {
    const { name, birthYear, nationality } = req.body;
    if (!name || !birthYear || !nationality)
      return handleError(res, new Error("Required data not provided."), "Validation Error", 400);

    try {
      const author = await authorService.createAuthor({ name, birthYear, nationality });
      return res.status(201).json(author);
    } catch (err) {
      return handleError(res, err as Error, "Error creating the author.");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const authors = await authorService.getAuthors();
      return res.json(authors);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching authors.");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const author = await authorService.getAuthorById(req.params.id);
      if (!author)
        return handleError(res, new Error("Author not found."), "Author not found.", 404);

      return res.json(author);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching the author.");
    }
  }

  async update(req: Request, res: Response) {
    const { name, birthYear, nationality } = req.body;
    try {
      const updatedAuthor = await authorService.updateAuthor(req.params.id, {
        name,
        birthYear,
        nationality,
      });
      return res.json(updatedAuthor);
    } catch (err) {
      return handleError(res, err as Error, "Error updating the author.");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await authorService.deleteAuthor(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return handleError(res, err as Error, "Error deleting the author.");
    }
  }
}

export default new AuthorController();
