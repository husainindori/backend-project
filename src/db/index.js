import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Async function to connect to MongoDB database
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI and database name from environment/config
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        // Log the host name if connection is successful
        console.log(`\n MongoDB CONNECTED SUCCESSFULLY: ${connectionInstance.connection.host}`); //variableName.connection.host gives the host name
    } catch (error) {
        // Log any connection errors and exit the process
        console.log(`MONGODB CONNECTION FAILED: ${error}`);
        process.exit(1);
    }
}

// Export the connectDB function for use in other parts of the application
export default connectDB;