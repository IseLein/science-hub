import mongoose from "mongoose";

const Draft = new mongoose.Schema({
    title: {
        type: String,
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
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Draft || mongoose.model("Draft", Draft)
