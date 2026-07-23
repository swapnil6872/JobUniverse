import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    opportunityType: {
      type: String,
      enum: ["Job", "Internship"],
      required: true,
    },
    openings:{
        type: Number,
        required: true
    },
    description:{
        about: {
            type: String,
            required: true
        },
        requirements: {
            type: String,
            required: true
        },
        whoApply:{
            type: String,
            required: true
        }
    },
    skills: [{
        type: String,
        required: true
    }],
    salary:{
        min:{
            type: Number,
            required: true
        },
        max:{
            type: Number,
            required: true
        }
    },
     variables: {
      min: { type: Number }, 
      max: { type: Number }
    },
    perks: [{
        type: String,
        required: true
    }],
    // Meta
    startDate:{
        type: Schema.Types.Mixed,
        required: true
    },
    endDate:{
        type: Schema.Types.Mixed,
        required: true
    },
    location:[{
        type: String,
        required: true
    }],
    locationType: {
      type: String,
      enum: ["Remote", "In-office", "Hybrid"],
      required: true,
    },
    applicantsCount: { 
        type: Number, 
        default: 0 
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time"],
      required: true,
    },
    company:{
       type: Schema.Types.ObjectId,
       ref: "Company",
       required: true
    },
     recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    applications: [
    {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
}, { timestamps: true });

const Job = mongoose.model("Job", JobSchema);

export default Job;
