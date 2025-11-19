import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Bienvenida endpoint - pendiente de implementar" });
});

export default router;