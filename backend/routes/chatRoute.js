import express from "express";
import { getRAGResponse } from "../services/groqService.js";
import Chat from "../models/Chat.js";
import Event from "../models/Event.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { message, anon_id, timestamp } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    if (!anon_id) {
      return res.status(400).json({ error: "Anonymous ID missing" });
    }

    // Save user message
    await Chat.create({
      anon_id,
      sender: "User",
      text: message,
      timestamp: timestamp || Date.now()
    });

    // Get AI response (existing RAG pipeline)
    const reply = await getRAGResponse(message);

    // Save AI response
    await Chat.create({
      anon_id,
      sender: "AI",
      text: reply,
      timestamp: Date.now()
    });

    // Log behavior event (judge suggestion)
    await Event.create({
      anon_id,
      event_type: "chat_message",
      metadata: { length: message.length },
      timestamp: timestamp || Date.now()
    });

    res.json({ reply });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "AI response failed"
    });

  }

});

export default router;