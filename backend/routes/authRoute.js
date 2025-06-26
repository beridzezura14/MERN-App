import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password !== process.env.UPLOAD_PASSWORD) {
    return res.status(401).json({ message: "პაროლი არასწორია" });
  }

  const token = jwt.sign({ access: true }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

export default router;
