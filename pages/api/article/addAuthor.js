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
        res.json({ author });
    } catch(error) {
        res.json({ error })
    }
}
