import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
import LoginController from "../controllers/login.js";
import DashboardController from "../controllers/dashboard.js";
import RegisterController from "../controllers/register.js";

import authMiddleware from "../middleware/auth.js";

router.get("/", HomeController);
router.post("/login", LoginController);
router.post("/register", RegisterController);
router.get("/dashboard", authMiddleware, DashboardController);

router.get('/logout', (req, res) => {
    req.session.auth = false;
    res.redirect(301,'/');
});

router.get('/message', (req, res) => {
    res.send(req.flash('message'));
})

export default router;
