const express = require("express");
const authController = require("../../controllers/auth/auth-controller");
const { model } = require("mongoose");
const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/users", authController.getUsersWithRole);

router.get("/check-auth", authController.authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
