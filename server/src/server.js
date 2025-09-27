import dotenv from "dotenv";
dotenv.config({ path: './.env',quiet: true });

import connectDB from "./config/db.js";
import { app } from "./app.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port}`,
        "http://localhost:8000/api/jobs"
      );
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
