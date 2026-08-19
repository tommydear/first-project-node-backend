import { Router } from "express";
import { About, postUser } from "../controllers/userController.js";

const router = Router()

router.get("/about", About)
router.post("/post-user", postUser)

export default router;