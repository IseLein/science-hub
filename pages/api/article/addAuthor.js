import dbConnect from '../../../util/dbConnect';
import Author from '../../../models/Author';
import { getToken } from 'next-auth/jwt';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addAuthor(req, res){
    const token = await getToken({ req });
    if (!token) {
        res.status(401).json({ success:false, error: "uhh, you're not allowed to do that" });
    }

    try {
        await dbConnect(); // Connect to the Database
        const author = await Author.create(req.body); // Create and add the Blog 'object'
        res.status(201).json({ success: true, author });
    } catch(error) {
        let errorMessage = "Unable to create record for contributor.";
        let statusCode = 500;

        if (error.name === "ValidationError") {
            errorMessage = "Invalid input. Please provide all required fields.";
            statusCode = 400;
        } else if (error.code === 11000) {
            errorMessage = "Duplicate key error. Please provide a unique value for the field.";
            statusCode = 400;
        } else if (error.name === "MongoError") {
            errorMessage = "Database Error. Please try again later.";
            statusCode = 400;
        }
        res.status(statusCode).json({ success: false, error: errorMessage });
    }
}
