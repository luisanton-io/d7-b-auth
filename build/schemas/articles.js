"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var reviews_1 = __importDefault(require("./reviews"));
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var ArticleSchema = new Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    cover: {
        type: String,
        required: true,
        trim: true,
    },
    reviews: [reviews_1.default],
}, { timestamps: true });
exports.default = model("Article", ArticleSchema);
