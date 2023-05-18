import dbConnect from "../../../util/dbConnect";
import Draft from "../../../models/Draft";
import { getToken } from "next-auth/jwt";

/**
* Update draft with id
* The request body should be something like:
*    {
*        draft_id: some id,
*        updates: {
*            title: new title,
*            categories: ["new", "categories"]
*        }
*    }
*/
export default async function updateDraft(req, res) {
    const token = await getToken({ req })
    if (!token) {
        res.status(401).json({ success:false, error: "uhh, you're not allowed to do that" });
    }

    try {
        await dbConnect();
        let draft = await Draft.findById(req.body.draft_id);

        const updates = req.body.updates
        let update = await Draft.findByIdAndUpdate(draft._id,
            updates, { new: true }
        );
        res.status(201).json({ success: true, updates: update });
    } catch(error) {
        let errorMessage = "Unable to save updates to draft";
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
