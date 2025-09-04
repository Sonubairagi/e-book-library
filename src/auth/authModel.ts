import mongoose from "mongoose";
import type { User } from "./authType.ts";

const authSchema = new mongoose.Schema<User>({
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

const authModel = mongoose.model<User>("User", authSchema);

export default authModel;