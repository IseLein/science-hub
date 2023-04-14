import mongoose from "mongoose";

const Author = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    }
})

export default mongoose.models.Author || mongoose.model("Author", Author)
