import { Request, Response } from "express";
import userService from "../services/user.service";
import { handleError } from "../utils/errorHandler";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, document } = req.body;

    if (!name || !email || !document) {
      return handleError(res, new Error("Required data not provided."), "Validation Error", 400);
    }


    if (await userService.getUserByEmail(email)) {
      return handleError(res, new Error("Email already in use."), "Email already in use.");
    }

    const sanitizedDocument = document.replace(/\D/g, '');

    if (await userService.getUserByDocument(sanitizedDocument)) {
      return handleError(res, new Error("Document already in use."), "Document already in use.");
    }

    try {
      const user = await userService.createUser({ name, email, document });
      return res.status(201).json(user);
    } catch (err) {
      return handleError(res, err as Error, "Error creating the user.");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      return res.json(users);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching users.");
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user)
        return handleError(res, new Error("User not found."), "User not found.", 404);

      return res.json(user);
    } catch (err) {
      return handleError(res, err as Error, "Error fetching the user.");
    }
  }

  async update(req: Request, res: Response) {
    const { name, email, document, isActive } = req.body;

    try {
      const updatedUser = await userService.updateUser(req.params.id, {
        name,
        email,
        document,
        isActive,
      });
      return res.json(updatedUser);
    } catch (err) {
      return handleError(res, err as Error, "Error updating the user.");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await userService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return handleError(res, err as Error, "Error deleting the user.");
    }
  }
}

export default new UserController();
