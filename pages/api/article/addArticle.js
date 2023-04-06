import dbConnect from '../../../util/dbConnect';
import Blog from '../../../models/Blog';
import { getToken } from 'next-auth/jwt';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addArticle(req, res){
    const token = await getToken({ req });
    if (!token) {
        res.status(401).json({ success:false, error: "uhh, you're not allowed to do that" });
    }

    try {
        await dbConnect(); // Connect to the Database
        const article = await Blog.create(req.body); // Create and add the Blog 'object'
        res.status(201).json({ success: true, article });
    } catch(error) {
        let errorMessage = "Unable to create blog post.";
        let statusCode = 500;

        if (error.name === "ValidationError") {
            errorMessage = "Invalid input. Please provide all required fields.";
            statusCode = 400;
        }
        res.status(statusCode).json({ success: false, error: errorMessage });
    }
}
