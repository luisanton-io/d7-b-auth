import mongoose from "mongoose";
import ReviewSchema from "./reviews";

const { Schema, model } = mongoose;

const ArticleSchema = new Schema(
  {
    headLine: {
      type: String,
      required: true,
      trim: true,
    },
    subHead: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      img: {
        type: String,
        trim: true,
      },
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    cover: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

export default model("Article", ArticleSchema);
