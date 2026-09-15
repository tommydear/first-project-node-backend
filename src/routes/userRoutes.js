import { Router } from "express";
import { About, postUser, login, logout, getProfile } from "../controllers/userController.js";
import { checkAuthentication } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/about", About)
router.post("/signup", postUser)
router.post("/login", login)
router.get("/logout", checkAuthentication, logout)
router.get("/profile", checkAuthentication, getProfile)

export default router;