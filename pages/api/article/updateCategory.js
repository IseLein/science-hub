import dbConnect from "../../../util/dbConnect";
import Category from "../../../models/Category";
import { getToken } from 'next-auth/jwt';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function updateCategory(req, res) {
    const token = await getToken({ req });
    if (!token) {
        res.status(401).json({ success:false, error: "uhh, you're not allowed to do that" });
    }

    try {
        await dbConnect();
        let updatedData = [];

        const categories = req.body.categories;
        for (let category of categories) {
            let data = await Category.findOne({ category: category });

            let newPosts = data.posts;
            newPosts[newPosts.length] = req.body.post_id;

            let update = await Category.findByIdAndUpdate(data._id,
                { posts: newPosts }, { new: true }
            );
            updatedData[updatedData.length] = update;
        }
        res.status(201).json({ success: true, updates: updatedData });
    } catch(error) {
        let errorMessage = "Unable to create category";
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
