import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

  anon_id: String,

  sender: String,

  text: String,

  timestamp: Number

});

export default mongoose.model("Chat", chatSchema);