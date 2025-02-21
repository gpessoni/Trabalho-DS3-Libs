import { Router } from "express";
import loanController from "../controllers/loan.controller";

const router = Router();

router.post("/", loanController.create);  
router.put("/return", loanController.return);  
router.get("/current", loanController.getCurrent);  
router.get("/book/:bookId", loanController.getByBook); 
router.get("/user/:userId", loanController.getByUser); 
export default router;
