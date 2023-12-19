import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    // destructruring data from request
    const { username, contactno, email, password} = req.body;

    // hashing the password
    const hashedPassword = bcryptjs.hashSync(password, 10); 

    // create new user
    const newUser = new User({username, contactno, email, password: hashedPassword});

    try{
        await newUser.save();
        res.status(201).json('User Created Successfully');
    }
    catch(error){
        next(error);
    }
}