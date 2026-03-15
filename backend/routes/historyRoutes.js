import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

router.get("/:anon_id", async (req, res) => {
  try {

    const { anon_id } = req.params;

    const history = await Chat.find({ anon_id });

    res.json({ history });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "History fetch failed"
    });

  }
});

export default router;