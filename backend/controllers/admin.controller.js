import ContactUsModel from '../models/contactus.model.js';
import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
import { errorHandler } from "../utils/error.js";

export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find({ email: { $ne: process.env.ADMIN_USER_NAME } });

        return res.status(200).json(users);
    }
    catch(error){
        next(error);
    }
};

export const getListingsDetails = async (req, res, next) => {
    try{
        const listings = await Listing.find();

        return res.status(200).json(listings);
    }
    catch(error){
        next(error);
    }
}

export const getUserQueries = async (req, res, next) => {
    try{
        const queries = await ContactUsModel.find();

        return res.status(200).json(queries);
    }
    catch(error){
        next(error);
    }
}


export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(404, 'Listing Not Found'));
    }

    try{
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    }
    catch(error){
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(errorHandler(404, 'User Not Found'));
    }

    try{
        await Listing.deleteMany({ userRef: req.params.id });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User and associated listing has been deleted');
    }
    catch(error){
        next(error);
    }
}

export const deleteUserQuery = async (req, res, next) => {
    const query = await ContactUsModel.findById(req.params.id);

    if(!query){
        return next(errorHandler(404, 'User Query Not Found'));
    }

    try{
        await ContactUsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('User Query has been deleted');
    }
    catch(error){
        next(error);
    }    
}


export const getUserInfo = async (req, res, next) => {
    const userId = req.params.id;

    try{
        const user = await User.find({ _id: userId });
        return res.status(200).json(user);
    }
    catch(error){
        next(error);
    }
}

export const getListingInfo = async (req, res, next) => {
    const listingId = req.params.id;

    try{
        const listing = await Listing.find({ _id: listingId });
        return res.status(200).json(listing);
    }
    catch(error){
        next(error);
    }
}