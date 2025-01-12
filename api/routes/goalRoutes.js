// api/routes/goalRoutes.js
import express from 'express';
import goalController from '../controllers/goalController';
import authMiddleware from '../middlewares/authMiddleware';

/**
 * Defines API routes for fitness goal management using Express.js.
 * This file handles route definitions for creating, reading, updating, and deleting goals
 * and delegates the actual logic to the goalController.js.
 * All routes are protected via the authMiddleware.authenticate to ensure only
 * authenticated users can access them.
 */

const router = express.Router();

/**
 * POST route for creating a new goal.
 *
 * Handles incoming POST requests to '/' and forwards the request to the
 * createGoalHandler function in goalController.js for processing.
 * @param {express.Request} req - The incoming request object, containing the goal details.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
router.post('/', authMiddleware.authenticate, goalController.createGoalHandler);


/**
 * GET route for retrieving a single goal by its ID.
 *
 * Handles incoming GET requests to '/:goalId' and forwards the request to the
 * getGoalHandler function in goalController.js for processing.
 * @param {express.Request} req - The incoming request object.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
router.get('/:goalId', authMiddleware.authenticate, goalController.getGoalHandler);


/**
 * PUT route for updating an existing goal by its ID.
 *
 * Handles incoming PUT requests to '/:goalId' and forwards the request to the
 * updateGoalHandler function in goalController.js for processing.
 * @param {express.Request} req - The incoming request object, containing updated goal details.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
router.put('/:goalId', authMiddleware.authenticate, goalController.updateGoalHandler);


/**
 * DELETE route for deleting a goal by its ID.
 *
 * Handles incoming DELETE requests to '/:goalId' and forwards the request to the
 * deleteGoalHandler function in goalController.js for processing.
 * @param {express.Request} req - The incoming request object.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
router.delete('/:goalId', authMiddleware.authenticate, goalController.deleteGoalHandler);

export default router;