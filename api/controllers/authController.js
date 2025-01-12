// api/controllers/authController.js
import express from 'express';
import { register, login } from '../services/authService';
import { sanitizeString } from '../../src/utils/helpers';

/**
 * Handles incoming HTTP requests related to user authentication, including registration and login.
 * Uses Express.js for routing and request handling, and interacts with the `authService.js`
 * to perform the actual authentication logic.
 */

const router = express.Router();

/**
 * Handles user registration requests.
 *
 * Extracts username, email, and password from the request body, sanitizes inputs,
 * calls the `register` method from `authService.js`, and sends a response with
 * the new user data or an error message.
 *
 * @param {express.Request} req - The incoming request object, containing user details.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
const registerUser = async (req, res) => {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    // Input validation: check if required fields are present
    if (!username || !email || !password) {
        console.error('Username, email and password are required.');
        return res.status(400).json({
            message: 'Username, email and password are required',
            code: 400,
            statusText: 'Bad Request'
        });
    }

    // Data sanitization
    const sanitizedUsername = sanitizeString(username);
    const sanitizedEmail = sanitizeString(email);
    const sanitizedPassword = sanitizeString(password);


    // Log a warning if password is received before sanitization
    if (password) {
        console.warn("Sensitive data (password) received before sanitization in registration controller.");
    }

    try {
        // Call the register method from authService
        const newUser = await register(sanitizedUsername, sanitizedEmail, sanitizedPassword);
        // Respond with 200 status code and the new user object
        res.status(200).json(newUser);
    } catch (error) {
        // Handle errors from authService and send an error response
        console.error('Error registering user:', error);
        res.status(error.code || 500).json({
            message: error.message || 'Registration failed. Please try again.',
            code: error.code || 500,
            statusText: error.statusText || 'Internal Server Error'
        });
    }
};

/**
 * Handles user login requests.
 *
 * Extracts email and password from the request body, sanitizes inputs,
 * calls the `login` method from `authService.js`, and sends a response with
 * user information, JWT token or an error message.
 *
 * @param {express.Request} req - The incoming request object, containing user credentials.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
const loginUser = async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Input validation: check if required fields are present
    if (!email || !password) {
        console.error('Email and password are required.');
        return res.status(400).json({
            message: 'Email and password are required',
            code: 400,
            statusText: 'Bad Request'
        });
    }

    // Data sanitization
    const sanitizedEmail = sanitizeString(email);
    const sanitizedPassword = sanitizeString(password);


    // Log a warning if password is received before sanitization
    if (password) {
      console.warn("Sensitive data (password) received before sanitization in login controller.");
    }

    try {
        // Call the login method from authService
        const result = await login(sanitizedEmail, sanitizedPassword);
          // Respond with 200 status code, user information and token
        res.status(200).json(result);
    } catch (error) {
        // Handle errors from authService and send an error response
        console.error('Error during login:', error);
        res.status(error.code || 500).json({
            message: error.message || 'Login failed. Please try again.',
            code: error.code || 500,
           statusText: error.statusText || 'Internal Server Error'
        });
    }
};

// Define routes for registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;