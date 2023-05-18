import mongoose from "mongoose";

const Draft = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    thumbnailSource: {
        type: String,
    },
    thumbnailAlt: {
        type: String,
    },
    categories: {
        type: [String],
    },
}, { timestamps: true });

export default mongoose.models.Draft || mongoose.model("Draft", Draft)
