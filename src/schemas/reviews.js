import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export default ReviewSchema;
