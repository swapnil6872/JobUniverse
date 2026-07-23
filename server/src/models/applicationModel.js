import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
   job: {
       type: Schema.Types.ObjectId,
       ref: "Job",
       required: true
   },
   applicant: {
       type: Schema.Types.ObjectId,
       ref: "User",
       required: true
   },
    resumeAtApply: { 
        type: String, 
        required: true
     },
   status: {
       type: String,
       enum: ["applied", "interview", "offered", "rejected"],
       default: "applied"
   }
},{timestamps:true});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
