import dbConnect from "../../../util/dbConnect";
import Draft from "../../../models/Draft";
import { getToken } from "next-auth/jwt";

export default async function deleteDraft(req, res) {
    const token = await getToken({ req });
    if (!token) {
        res.status(401).json({ success: false, error: "uhh, you're not allowed to do that" })
    }

    try {
        await dbConnect();
        const result = await Draft.findByIdAndDelete(req.body.draft_id);
        res.status(201).json({ success: true, result });
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
