// api/routes/authRoutes.js
import express from 'express';
import authController from '../controllers/authController';

/**
 * Defines API routes for user authentication using Express.js.
 * This file handles route definitions for registration and login and delegates
 * the actual authentication logic to the authController.js
 */

const router = express.Router();

/**
 * POST route for user registration.
 *
 * Handles incoming POST requests to '/register' and forwards the request to the
 * registerUser function in authController.js for processing.
 * @param {express.Request} req - The incoming request object containing user registration details.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
router.post('/register', authController.registerUser);

/**
 * POST route for user login.
 *
 * Handles incoming POST requests to '/login' and forwards the request to the
 * loginUser function in authController.js for processing.
 * @param {express.Request} req - The incoming request object containing user login credentials.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
router.post('/login', authController.loginUser);

export default router;