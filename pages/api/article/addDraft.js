import dbConnect from "../../../util/dbConnect";
import Draft from "../../../models/Draft";
import { getToken } from "next-auth/jwt";

/**
* request: Draft (could be incomplete, title and author must be present)
*/
export default async function addDraft(req, res) {
    const token = await getToken({ req });
    if (!token) {
        res.status(401).json({ success: false, error: "uhh, you're not allowed to do that" });
    }

    try {
        await dbConnect(); // connect to db
        const draft = await Draft.create(req.body);
        res.status(201).json({ success: true, draft });
    } catch (error) {
        let errorMessage = "Unable to save draft";
        let statusCode = 500;

        if (error.name === "ValidationError") {
            errorMessage = "Please provide a title for a draft to be saved";
            statusCode = 400;
        } else if (error.code === 11000) {
            errorMessage = "Duplicate key error";
            statusCode = 400;
        } else if (error.name === "MongoError") {
            errorMessage = "Database Error. Please try again later";
            statusCode = 400;
        }
        res.status(statusCode).json({ success: false, error: errorMessage });
    }
}
