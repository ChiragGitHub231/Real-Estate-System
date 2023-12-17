import express, { application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Connect application to MongoDB Database
mongoose.connect(process.env.MONGO_CONN).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log('Server is running on port',port);
});