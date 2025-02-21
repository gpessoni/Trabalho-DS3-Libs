import { Router } from "express";
import authorController from "../controllers/author.controller";

const router = Router();

router.post("/", authorController.create);
router.get("/", authorController.list);
router.get("/:id", authorController.getById);
router.put("/:id", authorController.update);
router.delete("/:id", authorController.delete);

export default router;
