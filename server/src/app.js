import express from 'express';
import jobRoutes from './routes/jobRoute.js';
import userRoute from './routes/userRoute.js'
import ExpressError from './utils/ExpressError.js';
import cors from 'cors';
import morgan from 'morgan';
import User from "./models/userModel.js";
import passport from 'passport';
import LocalStrategy from 'passport-local'
import session from'express-session'
import companyRoute from './routes/companyRoute.js';
import applicationRoute from './routes/applicationRoute.js';
import MongoStore from "connect-mongo";

const port = process.env.PORT 
console.log("PORT+1",port)

const app = express();

const corOptions = {
  origin: ["http://localhost:5173", process.env.CLIENT_URL],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sessionOptions= {
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
    }),
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true
    }
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy({ usernameField: "email" },User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "JobUniverse Backend is running 🚀"
    });
});

app.use('/api/jobs', jobRoutes);
app.use('/api/user', userRoute);
app.use("/api/company", companyRoute);
app.use("/api/application", applicationRoute);



app.use((err, req, res, next) => {
    let{status=500,message="something went wrong"} = err;
    res.status(status).json({
        success:false,
        status,
        message
    });
})

app.all("/*splat",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"));
})

export {app};