import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2020/03/17/17/36/database-4941302_1280.png',
    },
    website: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    industry:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    noOfEmployees:{
        type: Number,
        required: true
    },
    established: {
        type: String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

const Company = mongoose.model("Company", CompanySchema);

export default Company;
