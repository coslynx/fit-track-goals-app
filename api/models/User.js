// api/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { connectDB } from '../config/db';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9_]+$/.test(v);
            },
             message: props => `Username can only contain alphanumeric characters and underscores.`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
         validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `Email is not a valid email.`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false, // Exclude password from query results by default
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
});

// Static method to find a user by email and verify password
userSchema.statics.findByCredentials = async function (email, password) {
    try {
        const user = await this.findOne({ email }).select('+password');
        if (!user) {
             console.error("No user found with the given email:", email);
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             console.error("Password does not match for user:", email);
            return null;
        }
        return user;
    } catch (error) {
         console.error("Error finding user by credentials:", error);
        throw error;
    }
};

// Create the model if it doesn't already exist
let User;
try {
  // Attempt to retrieve existing model, throws error if not yet defined
  User = mongoose.model('User');
} catch (error) {
  // Create the model if not yet defined
    User = mongoose.model('User', userSchema);
}


// connect to db before exporting model
const dbConnection = await connectDB();
if (!dbConnection) {
  console.error('Failed to connect to the database, User model cannot be initialized.');
  process.exit(1);
}
export default User;