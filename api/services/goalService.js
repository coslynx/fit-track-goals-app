// api/services/goalService.js
import mongoose from 'mongoose';
import Goal from '../models/Goal';
import User from '../models/User';
import { connectDB } from '../config/db';
import { isValidObjectId, sanitizeString } from '../../src/utils/helpers';


/**
 * Provides the business logic for managing user fitness goals, including creation,
 * retrieval, updating, and deletion of goals.
 */

/**
 * Creates a new fitness goal for a user, including input validation, user existence check,
 * and saving the goal to the database.
 *
 * @param {string} userId - The ID of the user creating the goal.
 * @param {string} title - The title of the fitness goal.
 * @param {string} description - The description of the fitness goal.
 * @param {string} targetDate - The target date for the fitness goal.
 * @param {number} progress - The progress of the goal.
 * @returns {Promise<object>} A promise that resolves with the newly created goal object or rejects with an error object.
 * @throws {Error} If there is an issue with input validation, user lookup, or database access.
 */
const createGoal = async (userId, title, description, targetDate, progress) => {
    // Sanitize inputs
    const sanitizedTitle = sanitizeString(title);
    const sanitizedDescription = sanitizeString(description);

    // Validate inputs
    if (!userId || !isValidObjectId(userId)) {
        console.error('Invalid userId provided:', userId);
         throw {
            message: 'Invalid userId provided',
            code: 400,
            statusText: 'Bad Request',
        };
    }

    if (!sanitizedTitle || sanitizedTitle.trim() === '') {
        console.error('Goal title is required.');
         throw {
            message: 'Goal title is required',
            code: 400,
            statusText: 'Bad Request',
        };
    }

    if (sanitizedTitle.length > 100) {
      console.error('Goal title must be less than 100 characters long.');
      throw {
        message: 'Goal title must be less than 100 characters long',
        code: 400,
        statusText: 'Bad Request',
      };
    }

     if (sanitizedDescription && sanitizedDescription.length > 500) {
        console.error('Goal description must be less than 500 characters long.');
         throw {
            message: 'Goal description must be less than 500 characters long',
            code: 400,
            statusText: 'Bad Request',
        };
    }


    if (!targetDate) {
         console.error('Target date is required.');
         throw {
            message: 'Target date is required',
            code: 400,
            statusText: 'Bad Request',
        };
    }

    const targetDateObj = new Date(targetDate);
    if (isNaN(targetDateObj)) {
        console.error('Invalid target date format.');
          throw {
            message: 'Invalid target date format',
            code: 400,
            statusText: 'Bad Request',
        };
    }
    if (targetDateObj <= new Date()) {
      console.error('Target date must be in the future.');
      throw {
        message: 'Target date must be in the future',
        code: 400,
        statusText: 'Bad Request',
      };
    }
    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
        console.error('Progress must be a number between 0 and 100.');
        throw {
            message: 'Progress must be a number between 0 and 100',
            code: 400,
            statusText: 'Bad Request',
        };
    }


    try {

         // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
           console.error('User not found with the given userId:', userId);
             throw {
                message: 'User not found',
                code: 404,
                statusText: 'Not Found',
             };
        }
        const newGoal = new Goal({
            userId,
            title: sanitizedTitle,
            description: sanitizedDescription,
            targetDate: targetDateObj,
            progress,
        });
        const savedGoal = await newGoal.save();
        return savedGoal;
    } catch (error) {
      console.error('Failed to create goal:', error);

         // If error is already formatted, return the error
         if (error.message && error.code) {
              throw error;
          }

         throw {
              message: 'Failed to create goal',
             code: 500,
             statusText: 'Internal Server Error',
         };
    }
};


/**
 * Retrieves a single fitness goal by its ID and user ID from the database.
 *
 * @param {string} goalId - The ID of the goal to retrieve.
 * @param {string} userId - The ID of the user who owns the goal.
 * @returns {Promise<object>} A promise that resolves with the goal object or rejects with an error object.
 * @throws {Error} If there is an issue with input validation, goal lookup, or database access.
 */
const getGoal = async (goalId, userId) => {

    // Validate inputs
    if (!goalId || !isValidObjectId(goalId)) {
        console.error('Invalid goalId provided:', goalId);
         throw {
            message: 'Invalid goalId provided',
            code: 400,
            statusText: 'Bad Request',
        };
    }

     if (!userId || !isValidObjectId(userId)) {
        console.error('Invalid userId provided:', userId);
         throw {
            message: 'Invalid userId provided',
            code: 400,
            statusText: 'Bad Request',
        };
    }

    try {
         // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found with the given userId:', userId);
            throw {
              message: 'User not found',
              code: 404,
              statusText: 'Not Found',
            };
        }


        const goal = await Goal.findOne({ _id: goalId, userId: userId });
        if (!goal) {
            console.error('Goal not found with the given goalId and userId:', goalId, userId);
           throw {
                message: 'Goal not found',
                code: 404,
                statusText: 'Not Found',
            };
        }
        return goal;
    } catch (error) {
         console.error('Failed to retrieve goal:', error);

         // If error is already formatted, return the error
        if (error.message && error.code) {
            throw error;
        }

         throw {
              message: 'Failed to retrieve goal',
             code: 500,
            statusText: 'Internal Server Error',
         };
    }
};


/**
 * Updates an existing fitness goal with the specified parameters, including input validation,
 * user existence check, and updating the goal in the database.
 *
 * @param {string} goalId - The ID of the goal to update.
 * @param {string} userId - The ID of the user who owns the goal.
 * @param {string} title - The updated title of the fitness goal.
 * @param {string} description - The updated description of the fitness goal.
  * @param {string} targetDate - The updated target date for the fitness goal.
 * @param {number} progress - The updated progress of the goal.
 * @returns {Promise<object>} A promise that resolves with the updated goal object or rejects with an error object.
 * @throws {Error} If there is an issue with input validation, goal lookup, user lookup, or database access.
 */
const updateGoal = async (goalId, userId, title, description, targetDate, progress) => {

    // Sanitize inputs
    const sanitizedTitle = sanitizeString(title);
    const sanitizedDescription = sanitizeString(description);

    // Validate inputs
    if (!goalId || !isValidObjectId(goalId)) {
        console.error('Invalid goalId provided:', goalId);
         throw {
            message: 'Invalid goalId provided',
            code: 400,
            statusText: 'Bad Request',
        };
    }

      if (!userId || !isValidObjectId(userId)) {
        console.error('Invalid userId provided:', userId);
         throw {
            message: 'Invalid userId provided',
            code: 400,
             statusText: 'Bad Request',
        };
    }

    if (sanitizedTitle && sanitizedTitle.length > 100) {
         console.error('Goal title must be less than 100 characters long.');
          throw {
            message: 'Goal title must be less than 100 characters long',
            code: 400,
            statusText: 'Bad Request',
        };
    }
    if (sanitizedDescription && sanitizedDescription.length > 500) {
         console.error('Goal description must be less than 500 characters long.');
          throw {
            message: 'Goal description must be less than 500 characters long',
            code: 400,
            statusText: 'Bad Request',
        };
    }
     if (targetDate) {
        const targetDateObj = new Date(targetDate);
        if (isNaN(targetDateObj)) {
            console.error('Invalid target date format.');
            throw {
                message: 'Invalid target date format',
                 code: 400,
                statusText: 'Bad Request',
             };
        }
      if (targetDateObj <= new Date()) {
          console.error('Target date must be in the future.');
          throw {
            message: 'Target date must be in the future',
            code: 400,
            statusText: 'Bad Request',
          };
        }
    }

    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
       console.error('Progress must be a number between 0 and 100.');
        throw {
            message: 'Progress must be a number between 0 and 100',
             code: 400,
             statusText: 'Bad Request',
        };
    }


    try {
          // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
           console.error('User not found with the given userId:', userId);
            throw {
              message: 'User not found',
              code: 404,
              statusText: 'Not Found',
            };
        }
        const goal = await Goal.findOne({ _id: goalId, userId: userId });
        if (!goal) {
           console.error('Goal not found with the given goalId and userId:', goalId, userId);
            throw {
                message: 'Goal not found',
                code: 404,
                statusText: 'Not Found',
            };
        }


        if(sanitizedTitle) goal.title = sanitizedTitle;
        if(sanitizedDescription) goal.description = sanitizedDescription;
        if(targetDate) goal.targetDate = new Date(targetDate);
        if(progress) goal.progress = progress;
        const updatedGoal = await goal.save();
        return updatedGoal;
    } catch (error) {
      console.error('Failed to update goal:', error);

        // If error is already formatted, return the error
        if (error.message && error.code) {
              throw error;
        }

         throw {
             message: 'Failed to update goal',
            code: 500,
            statusText: 'Internal Server Error',
         };
    }
};



/**
 * Deletes a fitness goal by its ID and user ID from the database.
 *
 * @param {string} goalId - The ID of the goal to delete.
 * @param {string} userId - The ID of the user who owns the goal.
 * @returns {Promise<object>} A promise that resolves with a success message object or rejects with an error object.
 * @throws {Error} If there is an issue with input validation, goal lookup, user lookup, or database access.
 */
const deleteGoal = async (goalId, userId) => {
     // Validate inputs
    if (!goalId || !isValidObjectId(goalId)) {
        console.error('Invalid goalId provided:', goalId);
        throw {
            message: 'Invalid goalId provided',
             code: 400,
            statusText: 'Bad Request',
        };
    }

    if (!userId || !isValidObjectId(userId)) {
        console.error('Invalid userId provided:', userId);
        throw {
            message: 'Invalid userId provided',
            code: 400,
            statusText: 'Bad Request',
        };
    }


    try {
         // Check if the user exists
      const user = await User.findById(userId);
        if (!user) {
           console.error('User not found with the given userId:', userId);
            throw {
               message: 'User not found',
               code: 404,
               statusText: 'Not Found',
            };
       }

      const goal = await Goal.findOne({ _id: goalId, userId: userId });

        if (!goal) {
           console.error('Goal not found with the given goalId and userId:', goalId, userId);
          throw {
            message: 'Goal not found',
             code: 404,
            statusText: 'Not Found',
        };
        }

        await Goal.deleteOne({ _id: goalId, userId: userId });
        return { message: 'Goal deleted successfully' };
    } catch (error) {
         console.error('Failed to delete goal:', error);

         // If error is already formatted, return the error
        if (error.message && error.code) {
           throw error;
        }
        throw {
            message: 'Failed to delete goal',
            code: 500,
            statusText: 'Internal Server Error',
        };
    }
};



export { createGoal, getGoal, updateGoal, deleteGoal };