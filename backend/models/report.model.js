import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    listingownerid: {
        type: String,
        required: true,
    },
    listingid: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const ReportModel = mongoose.model('ReportModel', reportSchema);

export default ReportModel;