import mongoose from "mongoose";
import { config } from "./config.js";


export const connectDb=async()=>{
    try {
        console.log("Mongo Url",config.mongodbUri)

        const connection=await mongoose.connect(config.mongodbUri);
        if(connection){
            console.log("Connected to MongoDb")
        }

    } catch (error) {
        console.error("Error connecting to MongoDb",error);
    }
}


export default connectDb;