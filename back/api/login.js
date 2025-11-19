import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "Login endpoint - pendiente de implementar" });
});

export default router;