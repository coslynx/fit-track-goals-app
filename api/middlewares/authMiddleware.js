// api/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { isValidObjectId, sanitizeString } from '../../src/utils/helpers';

/**
 * Implements JWT-based authentication middleware to protect API endpoints.
 * Verifies the JWT token from the Authorization header and attaches the user object to the request.
 */

/**
 * Middleware function to authenticate requests using JWT.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The next middleware function in the chain.
 * @returns {Promise<void>} -  A promise that resolves when the authentication is complete.
 */
const authenticate = async (req, res, next) => {
    // Extract Authorization header from the request
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is missing
    if (!authHeader) {
        console.error('Authentication failed: No token provided');
        return res.status(401).json({
            message: 'Authentication failed: No token provided',
            code: 401,
            statusText: 'Unauthorized',
        });
    }

     // Check if the Authorization header is in the correct format (Bearer <token>)
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        console.error('Authentication failed: Invalid token format');
          return res.status(401).json({
              message: 'Authentication failed: Invalid token format',
              code: 401,
              statusText: 'Unauthorized',
          });
    }

    // Extract the token from the Authorization header
    const token = tokenParts[1];
    if(!token || token.trim() === '') {
        console.error('Authentication failed: Token is empty');
        return res.status(401).json({
            message: 'Authentication failed: Token is empty',
            code: 401,
            statusText: 'Unauthorized',
        });
    }
    try {
        // Verify the JWT token using the JWT_SECRET from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if userId exists in the decoded token
        if (!decoded || !decoded.userId) {
           console.error('Authentication failed: Invalid token payload.');
              return res.status(401).json({
                  message: 'Authentication failed: Invalid token payload',
                  code: 401,
                  statusText: 'Unauthorized',
              });
        }

        const userId = sanitizeString(decoded.userId);

          // Input validations for userId
        if (!userId || !isValidObjectId(userId)) {
            console.error('Authentication failed: Invalid userId format in token payload.');
            return res.status(401).json({
                message: 'Authentication failed: Invalid userId format in token payload',
                code: 401,
                statusText: 'Unauthorized',
            });
        }

       // Retrieve the user from the database based on the userId from the decoded token
       const user = await User.findById(userId);

         // Check if user is found
        if (!user) {
            console.error('Authentication failed: User not found.');
            return res.status(401).json({
               message: 'Authentication failed: User not found',
               code: 401,
               statusText: 'Unauthorized',
            });
        }

        // Add the user details to the request object
        req.user = {
            userId: user._id,
             email: user.email,
        };
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
         // Handle JWT verification errors
        console.error('Authentication failed:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Authentication failed: Token Expired',
                code: 401,
                statusText: 'Unauthorized',
             });
         }
         return res.status(401).json({
             message: error.message || 'Authentication failed: Invalid token',
             code: 401,
             statusText: 'Unauthorized',
         });
    }
};

export default { authenticate };