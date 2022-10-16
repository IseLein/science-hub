import mongoose from "mongoose";

const Blog = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
    },
    readTime: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
    },
    comments: {
        type: [{
            name: String,
            comment: String,
            likes: Number,
        }],
    }
}, { timestamps:true });

export default mongoose.models.Blog || mongoose.model("Blog", Blog)