import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    app.on("error", (error) => {
      console.log(`Error Server is not working on port ${port}: ${error}`);
    });
  })
  .catch((error) => {
    console.log(`MONGO DB CONNECTION FAILED!!!: ${error}`);
  });








  

/*
import express from "express";
const app = express();
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log(`Error: ${error}`);
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error(`Error: ${error}`);
        throw error
    }
})()

*/
