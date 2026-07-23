import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "recruiter"],
        required: true
    },
    profile:{
        bio:{
            type: String,
        },
        skill:[{
            type: String,
        }],
        resume:{
            type: String,
        },
        profilePicture:{
            type: String,
            default: "https://www.gravatar.com/avatar/"
        },
        designation:{
            type: String,
        },
        company:[{
            type: Schema.Types.ObjectId,
            ref: "Company",
        }]
    }
},{timestamps:true});

userSchema.plugin(passportLocalMongoose,{ usernameField: "email" });

const User = mongoose.model("User", userSchema);

export default User;
