import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  notes: { type: String },
  locked: { type: Boolean, default: false },
});

export default mongoose.model("Contact", contactSchema);
