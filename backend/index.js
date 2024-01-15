import express, { application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// Connect application to MongoDB Database
mongoose.connect(process.env.MONGO_CONN).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();

// Allow JSON as input to the server otherwise it will get undefined
app.use(express.json());

// Initialize CookieParser
app.use(cookieParser());

const port = 3000;

app.listen(port, () => {
    console.log('Server is running on port',port);
});

// call at 3000/api/user
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


// Middleware
app.use((err, req, res, next) => {
    // 500 for Internal Server Error
    const statusCode = err.statusCode || 500;
    
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});