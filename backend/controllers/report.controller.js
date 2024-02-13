import ReportModel from "../models/report.model.js"
import { errorHandler } from "../utils/error.js";

export const SendReport = async (req, res, next) => {
    const { listingownerid, listingid, description } = req.body;

    try{
        const newReport = await ReportModel({ listingownerid: listingownerid, listingid: listingid, description: description });
        try{
            await newReport.save();
            res.status(201).json('Report Created Successfully');
        }
        catch(error){
            next(error);
        }
    } catch(error){
        next(error);
    }
}

export const getReports = async (req, res, next) => {
    try{
        const reports = await ReportModel.find();

        return res.status(200).json(reports);
    }
    catch(error){
        next(error);
    }
}

export const deleteReport = async (req, res, next) => {
    const report = await ReportModel.findById(req.params.id);

    if(!report){
        return next(errorHandler(404, 'Report Not Found'));
    }

    try{
        await ReportModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Report has been deleted');
    }
    catch(error){
        next(error);
    }
}