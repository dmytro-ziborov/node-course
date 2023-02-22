import mongoose, { Schema, Types } from "mongoose";

export interface Item {
  _id: Types.ObjectId;
  text: string;
  checked: boolean;
}

export const itemSchema = new Schema<Item>(
  {
    text: {
      type: String,
      required: true,
      default: "",
    },
    checked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false }
);
