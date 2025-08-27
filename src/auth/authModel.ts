import mongoose from "mongoose";
import type { User } from "./authType.ts";

const authSchema = new mongoose.Schema<User>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
},
{timestamps: true});

const autModel = mongoose.model<User>("User", authSchema);

export default autModel;