// api/controllers/goalController.js
import express from 'express';
import { createGoal, getGoal, updateGoal, deleteGoal } from '../services/goalService';
import { sanitizeString, isValidObjectId } from '../../src/utils/helpers';
import authMiddleware from '../middlewares/authMiddleware';

/**
 * Handles incoming HTTP requests related to fitness goal management, interacting with the `goalService.js`.
 * Uses Express.js for routing and request handling. All routes are protected via auth middleware.
 */

const router = express.Router();
router.use(authMiddleware.authenticate); // Protect all routes with authentication

/**
 * Handles the creation of a new goal.
 * Extracts userId, title, description, targetDate and progress from the request body.
 * Sanitizes and validates the inputs and then calls createGoal service, sends appropriate response.
 *
 * @param {express.Request} req - The incoming request object, containing the goal details.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
const createGoalHandler = async (req, res) => {
    const userId = req.user.userId; // Extract userId from the authenticated user
    const { title, description, targetDate, progress } = req.body;

    // Sanitize inputs
    const sanitizedTitle = sanitizeString(title);
    const sanitizedDescription = sanitizeString(description);


    // Input validations: check if required fields are present
    if (!title || !description || !targetDate || progress === undefined) {
      console.error('Title, description, targetDate and progress are required.');
        return res.status(400).json({
            message: 'Title, description, targetDate and progress are required',
            code: 400,
            statusText: 'Bad Request',
        });
    }

    if (typeof progress !== 'number') {
      console.error('Progress must be a number.');
      return res.status(400).json({
          message: 'Progress must be a number',
          code: 400,
          statusText: 'Bad Request',
      });
    }
    try {
        // Call the createGoal method from goalService
      const newGoal = await createGoal(userId, sanitizedTitle, sanitizedDescription, targetDate, progress);
      // Respond with 201 status code and the new goal object
      res.status(201).json(newGoal);
    } catch (error) {
        // Handle errors from goalService and send an error response
        console.error('Error creating goal:', error);
      res.status(error.code || 500).json({
            message: error.message || 'Failed to create goal. Please try again.',
            code: error.code || 500,
            statusText: error.statusText || 'Internal Server Error',
        });
    }
};



/**
 * Handles fetching a single goal by its ID.
 * Extracts goalId and userId from the request parameters.
 * Validates the inputs and then calls the getGoal service, sends the response.
 *
 * @param {express.Request} req - The incoming request object.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
const getGoalHandler = async (req, res) => {
    const { goalId } = req.params;
    const userId = req.user.userId; // Extract userId from the authenticated user
    
     // Input validation: check if required fields are present
    if (!goalId) {
        console.error('Goal ID is required.');
        return res.status(400).json({
          message: 'Goal ID is required',
          code: 400,
          statusText: 'Bad Request',
        });
    }
    
    if(!isValidObjectId(goalId)){
        console.error('Invalid goalId format:', goalId);
        return res.status(400).json({
           message: 'Invalid goalId format',
           code: 400,
           statusText: 'Bad Request'
       });
    }

    try {
        // Call the getGoal method from goalService
      const goal = await getGoal(goalId, userId);
      // Respond with 200 status code and the goal object
      res.status(200).json(goal);
    } catch (error) {
         // Handle errors from goalService and send an error response
        console.error('Error retrieving goal:', error);
        res.status(error.code || 500).json({
          message: error.message || 'Failed to retrieve goal. Please try again.',
          code: error.code || 500,
          statusText: error.statusText || 'Internal Server Error',
        });
    }
};


/**
 * Handles updating an existing goal.
 * Extracts goalId from the request parameters and title, description, targetDate and progress from request body.
 * Sanitizes and validates the inputs, then calls the updateGoal service and sends the appropriate response.
 *
 * @param {express.Request} req - The incoming request object, containing goal details for update.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
const updateGoalHandler = async (req, res) => {
    const { goalId } = req.params;
    const userId = req.user.userId; // Extract userId from the authenticated user
    const { title, description, targetDate, progress } = req.body;

    // Sanitize inputs
    const sanitizedTitle = sanitizeString(title);
    const sanitizedDescription = sanitizeString(description);


    // Input validations: check if required fields are present
    if (!goalId) {
      console.error('Goal ID is required.');
      return res.status(400).json({
        message: 'Goal ID is required',
        code: 400,
        statusText: 'Bad Request',
      });
    }

    if(!isValidObjectId(goalId)){
       console.error('Invalid goalId format:', goalId);
      return res.status(400).json({
        message: 'Invalid goalId format',
        code: 400,
        statusText: 'Bad Request'
       });
    }
    
   if (progress !== undefined && typeof progress !== 'number') {
        console.error('Progress must be a number.');
        return res.status(400).json({
            message: 'Progress must be a number',
            code: 400,
            statusText: 'Bad Request',
        });
    }

    try {
         // Call the updateGoal method from goalService
      const updatedGoal = await updateGoal(goalId, userId, sanitizedTitle, sanitizedDescription, targetDate, progress);
        // Respond with 200 status code and the updated goal object
        res.status(200).json(updatedGoal);
    } catch (error) {
         // Handle errors from goalService and send an error response
        console.error('Error updating goal:', error);
        res.status(error.code || 500).json({
            message: error.message || 'Failed to update goal. Please try again.',
            code: error.code || 500,
            statusText: error.statusText || 'Internal Server Error',
        });
    }
};


/**
 * Handles deleting a goal by its ID.
 * Extracts goalId and userId from the request parameters, calls deleteGoal service.
 * Sends a success message on successful deletion or an error response if deletion fails.
 *
 * @param {express.Request} req - The incoming request object.
 * @param {express.Response} res - The outgoing response object.
 * @returns {Promise<void>}
 */
const deleteGoalHandler = async (req, res) => {
  const { goalId } = req.params;
  const userId = req.user.userId; // Extract userId from the authenticated user


    // Input validations: check if required fields are present
    if (!goalId) {
      console.error('Goal ID is required.');
      return res.status(400).json({
          message: 'Goal ID is required',
          code: 400,
          statusText: 'Bad Request',
      });
    }
   if(!isValidObjectId(goalId)){
        console.error('Invalid goalId format:', goalId);
        return res.status(400).json({
            message: 'Invalid goalId format',
            code: 400,
            statusText: 'Bad Request'
        });
    }

    try {
        // Call the deleteGoal method from goalService
       await deleteGoal(goalId, userId);
        // Respond with 200 status code and a success message
      res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        // Handle errors from goalService and send an error response
        console.error('Error deleting goal:', error);
      res.status(error.code || 500).json({
            message: error.message || 'Failed to delete goal. Please try again.',
            code: error.code || 500,
            statusText: error.statusText || 'Internal Server Error',
        });
    }
};


// Define routes for each operation, using the authMiddleware for protection
router.post('/', createGoalHandler);
router.get('/:goalId', getGoalHandler);
router.put('/:goalId', updateGoalHandler);
router.delete('/:goalId', deleteGoalHandler);

export default router;