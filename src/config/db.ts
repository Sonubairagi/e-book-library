import mongoose from "mongoose";
import { config } from "./config.ts";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to database");
        });

        mongoose.connection.on("error", (err) => {
            console.error("Error in connecting to database: ", err);
        });

        await mongoose.connect(config.databaseURL as string);
    } catch (err) {
        console.error("Error ocurred while connecting to the database: ", err);
        process.exit(1);
    }
};

export default connectDB;
