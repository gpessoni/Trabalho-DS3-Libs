import { Router } from "express";
import bookController from "../controllers/book.controller";
import { validateBookExists } from "../middlewares/book.middleware";

const router = Router();

router.post("/", bookController.create);
router.get("/", bookController.list);
router.get("/lended", bookController.listLended);
router.get("/not-lended", bookController.listNotLended);
router.get("/:id", validateBookExists, bookController.getById);
router.put("/:id", validateBookExists, bookController.update);
router.delete("/:id", validateBookExists, bookController.delete);

export default router;
