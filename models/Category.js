import mongoose from "mongoose";

const Category = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    bannerImage: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    posts: {
        type: [String],
        required: true,
    },
})

export default mongoose.models.Category || mongoose.model("Category", Category)
