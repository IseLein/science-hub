import mongoose from "mongoose";
import slugify from "slugify";

const Author = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    }
})

Author.pre('validate', function() {
    if (this.name) {
        this.slug = slugify(this.name, {lower: true, strict: true});
        this.firstName = this.name.split(" ").slice(0, 1).join(" ");
    }
})

export default mongoose.models.Author || mongoose.model("Author", Author)