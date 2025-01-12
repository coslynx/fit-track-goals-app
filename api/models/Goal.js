// api/models/Goal.js
import mongoose from 'mongoose';
import { connectDB } from '../config/db';

/**
 * Defines the schema for fitness goals in the database.
 * Includes a reference to the user model via userId, and timestamp fields
 * for tracking creation and update times.
 * @type {mongoose.Schema}
 */
const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true, // Indexing on userId for optimized queries
    },
    title: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    targetDate: {
        type: Date,
        validate: {
            validator: function(v) {
                return v > new Date();
            },
            message: props => `Target date must be a valid date in the future.`
        }
    },
    progress: {
        type: Number,
        default: 0,
        validate: {
            validator: function(v) {
                return v >= 0 && v <= 100;
            },
             message: props => `Progress must be a number between 0 and 100.`
        }
    },
}, {
    timestamps: true,
});


// Create the model if it doesn't already exist
let Goal;
try {
    // Attempt to retrieve existing model, throws error if not yet defined
    Goal = mongoose.model('Goal');
} catch (error) {
    // Create the model if not yet defined
    Goal = mongoose.model('Goal', goalSchema);
}

// connect to db before exporting model
const dbConnection = await connectDB();
if (!dbConnection) {
    console.error('Failed to connect to the database, Goal model cannot be initialized.');
    process.exit(1);
}
export default Goal;