import Chat from "../models/Chat.js";

export const getHistory = async (req, res) => {

  const { anon_id } = req.params;

  try {

    const history = await Chat.find({ anon_id });

    res.json({ history });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "History fetch failed" });

  }
};