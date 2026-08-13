import { Router } from "express";
import { About, Contact } from "../controllers/userController";

const router = Router()

router.get("/about", About)
router.get("/contact", Contact)

export default router;