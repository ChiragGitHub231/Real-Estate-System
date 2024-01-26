import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const ContactUsModel = mongoose.model('ContactUsModel', contactUsSchema);

export default ContactUsModel;