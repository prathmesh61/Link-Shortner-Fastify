import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  orginalLink: {
    type: String,
    required: true,
  },
  shortLink: {
    type: String,
    required: true,
    unique: true,
  },
  visitHistory: [{ timestamp: { type: Number } }],
});

const Link = mongoose.model("Link", linkSchema);
export default Link;
