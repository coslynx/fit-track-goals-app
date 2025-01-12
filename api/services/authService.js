// api/services/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { isValidEmail, sanitizeString } from '../../src/utils/helpers';

/**
 * Provides the business logic for user authentication, including registration, login,
 * JWT generation, and token verification.
 */

/**
 * Registers a new user in the database, handling input validation, password hashing,
 * and user creation.
 *
 * @param {string} username - The username of the new user.
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise<object>} A promise that resolves with the newly created user object (without password) or rejects with an error object.
 * @throws {Error} If there is an issue with input validation, database access, or password hashing.
 */
const register = async (username, email, password) => {
    // Sanitize inputs
    const sanitizedUsername = sanitizeString(username);
    const sanitizedEmail = sanitizeString(email);
    const sanitizedPassword = sanitizeString(password);

    // Input validations
    if (!sanitizedUsername || sanitizedUsername.trim() === '') {
        console.error('Username is required.');
        throw {
            message: 'Username is required',
            code: 400,
            statusText: 'Bad Request',
        };
    }

     if (!sanitizedEmail || sanitizedEmail.trim() === '') {
        console.error('Email is required.');
        throw {
            message: 'Email is required',
            code: 400,
            statusText: 'Bad Request',
        };
    }

     if (!isValidEmail(sanitizedEmail)) {
        console.error('Invalid email format.');
        throw {
            message: 'Invalid email format',
            code: 400,
            statusText: 'Bad Request',
        };
    }

    if (!sanitizedPassword || sanitizedPassword.length < 8) {
        console.error('Password must be at least 8 characters long.');
        throw {
            message: 'Password must be at least 8 characters long',
            code: 400,
            statusText: 'Bad Request',
        };
    }


    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: sanitizedEmail });
        if (existingUser) {
            console.error('User with this email already exists.');
            throw {
                message: 'User with this email already exists',
                code: 400,
                statusText: 'Bad Request',
            };
        }

         // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);

        // Create a new user
        const newUser = new User({
            username: sanitizedUsername,
            email: sanitizedEmail,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();


        // Return the new user object (without password)
        return {
           username: savedUser.username,
           email: savedUser.email,
           id: savedUser._id,
           createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
       };


    } catch (error) {
        console.error('Error registering user:', error);

      // if error is already formatted, return the error
        if (error.message && error.code) {
            throw error;
        }


        throw {
            message: error.message || 'Failed to register user',
            code: 500,
            statusText: 'Internal Server Error',
        };
    }
};


/**
 * Logs in a user, validates credentials, and returns a JWT.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} A promise that resolves with a success message, a JWT token, and user details (without password), or rejects with an error object.
 * @throws {Error} If there is an issue with input validation, user lookup, password comparison, or token generation.
 */
const login = async (email, password) => {
    // Sanitize Inputs
     const sanitizedEmail = sanitizeString(email);
     const sanitizedPassword = sanitizeString(password);

    // Input validation
     if (!sanitizedEmail || sanitizedEmail.trim() === '') {
        console.error('Email is required.');
         throw {
            message: 'Email is required',
            code: 400,
            statusText: 'Bad Request',
        };
    }
    if (!isValidEmail(sanitizedEmail)) {
        console.error('Invalid email format.');
        throw {
            message: 'Invalid email format',
            code: 400,
            statusText: 'Bad Request',
        };
    }
    if (!sanitizedPassword || sanitizedPassword.length < 8) {
          console.error('Password must be at least 8 characters long.');
        throw {
            message: 'Password must be at least 8 characters long',
            code: 400,
            statusText: 'Bad Request',
        };
    }

    try {

        // Find the user by email, select password to verify
        const user = await User.findByCredentials(sanitizedEmail, sanitizedPassword);

       // If user not found or password does not match
        if (!user) {
            console.error('Invalid login credentials.');
            throw {
                message: 'Invalid login credentials',
                code: 404,
                statusText: 'Not Found',
            };
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        // Return success message with JWT and user details (without password)
        return {
            message: 'Login successful',
            token,
            user: {
                username: user.username,
                email: user.email,
                id: user._id,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
        };
    } catch (error) {
        console.error('Error during login:', error);
           // if error is already formatted, return the error
         if (error.message && error.code) {
                throw error;
         }

          throw {
            message: error.message || 'Login failed. Please try again.',
            code: error.code || 500,
            statusText: error.statusText || 'Internal Server Error',
        };
    }
};


/**
 * Verifies a JWT token and returns the decoded token if valid.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {Promise<object>} A promise that resolves with the decoded token if valid or rejects with an error object if not valid.
 * @throws {Error} If the token is invalid or expired.
 */
const verifyToken = async (token) => {
    if (!token) {
        console.error('JWT token is missing.');
         throw {
            message: 'JWT token is missing',
            code: 400,
            statusText: 'Bad Request',
        };
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
          throw {
                message: error.message || 'Invalid or expired token',
                code: 401,
                statusText: 'Unauthorized',
            };

    }
};


export { register, login, verifyToken };