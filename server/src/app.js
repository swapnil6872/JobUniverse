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


const app = express();

const corOptions = {
      origin: 'http://localhost:5173',
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

app.use(cors(corOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sessionOptions= {
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:+ 7*24*60*60*1000,
        httpOnly:true
    }
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy({ usernameField: "email" },User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/api/jobs', jobRoutes);
app.use('/api/user', userRoute);


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