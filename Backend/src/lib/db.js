import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const {MONGO_URI} = process.env;
        if(!MONGO_URI) throw new Error("Mongo Uri not set");
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose Connected: ", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to Mongoose", error);
        process.exit(1);
    }
}