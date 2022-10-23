import dbConnect from '../../../util/dbConnect';
import Author from '../../../models/Author';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addAuthor(req, res){
    try {
        await dbConnect(); // Connect to the Database
        const author = await Author.create(req.body); // Create and add the Blog 'object'
        res.json({ author });
    } catch(error) {
        res.json({ error })
    }
}