import Chat from "../models/Chat.js";
import Event from "../models/Event.js";

export const sendChat = async (req, res) => {

  const { message, anon_id, timestamp } = req.body;

  try {

    // store user message
    await Chat.create({
      anon_id,
      sender: "User",
      text: message,
      timestamp
    });

    // simulate AI reply (replace later with Groq API)
    const reply = "I understand. Tell me more about how you're feeling.";

    await Chat.create({
      anon_id,
      sender: "AI",
      text: reply,
      timestamp: Date.now()
    });

    // log behavioral event
    await Event.create({
      anon_id,
      event_type: "chat_message",
      metadata: { message_length: message.length },
      timestamp
    });

    res.json({ reply });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Server error" });

  }
};