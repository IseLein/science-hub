import mongoose from "mongoose";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import readingTime from "reading-time";
import slugify from "slugify";
const dompurify = createDOMPurify(new JSDOM().window);

const Blog = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    sanitizedHtml: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    readTime: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    comments: {
        type: [{
            name: String,
            comment: String,
            likes: Number,
        }],
    }
}, { timestamps:true });

Blog.pre('validate', function() {
    if (this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true});
    }
    if (this.content) {
        const time = readingTime(this.content);
        if (time.text) {
            this.readTime = time.text;
        }
        this.sanitizedHtml = dompurify.sanitize(marked(this.content));
    }
    this.publishedDate = Date.now();
});

export default mongoose.models.Blog || mongoose.model("Blog", Blog)