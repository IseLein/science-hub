import dbConnect from '../../../util/dbConnect';
import Blog from '../../../models/Blog';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addArticle(req, res){
    try {
        await dbConnect(); // Connect to the Database
        const article = await Blog.create(req.body); // Create the Blog 'object'
        res.json({ article });
    } catch(error) {
        res.json({ error })
    }
}