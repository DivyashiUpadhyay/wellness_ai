import express from "express";
import { getRAGResponse } from "../services/groqService.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const reply = await getRAGResponse(message);

    res.json({ reply });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "AI response failed"
    });

  }

});

export default router;