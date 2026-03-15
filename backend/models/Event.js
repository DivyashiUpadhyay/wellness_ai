import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

  anon_id: String,

  event_type: String,

  metadata: Object,

  timestamp: Number

});

export default mongoose.model("Event", eventSchema);