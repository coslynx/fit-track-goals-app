// api/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;

if (!MONGODB_URI) {
    console.error('MongoDB URI is not defined in the environment variables.');
    process.exit(1);
}

let cachedConnection = null;

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * Implements a singleton pattern to ensure only one connection is established.
 * Handles connection retries and logs messages in case of failure.
 * Exits the process if the connection fails to avoid server startup without valid database connection.
 * @returns {Promise<mongoose.Connection>} A promise that resolves with the mongoose connection object or rejects with an error.
 */
const connectDB = async () => {

    if (cachedConnection) {
      console.log('Using cached database connection.');
      return cachedConnection;
    }
  
    const connectionOptions = {};
      // Add authentication if user and password are provided
    if (MONGODB_USER && MONGODB_PASS) {
        connectionOptions.auth = {
            username: MONGODB_USER,
            password: MONGODB_PASS
        };
    }

    try {
        const connection = await mongoose.connect(MONGODB_URI, connectionOptions);
         console.log('MongoDB Connected');
        cachedConnection = connection;
         // Add event listener for connection errors that occur after initial connection.
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB Connection Error:', err);
           // Close the database connection and set cachedConnection to null
            mongoose.connection.close(() => {
                  console.log('MongoDB connection closed due to error.');
              cachedConnection = null;
            });
        });

        return connection;
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
         cachedConnection = null;
        process.exit(1);
    }
};

export { connectDB };