// Import date-fns for date formatting and validation
import { format, isValid } from 'date-fns';
// Import crypto for random string generation
import crypto from 'crypto';


/**
 * Checks if a given string is a valid email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 *
 * @example
 * isValidEmail('test@example.com') // returns true
 * isValidEmail('invalid-email') // returns false
 * isValidEmail(null) // returns false
 */
const isValidEmail = (email) => {
    // Return false for null or undefined input
    if (email == null) {
        return false;
    }
  // Return false for empty strings
  if (typeof email !== 'string' || email.trim() === '') {
    return false;
  }

  // Regular expression for email validation
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  // Return true if the email matches the regex pattern, false otherwise
  return emailRegex.test(email);
};



/**
 * Formats a Date object or a string representation of a date into a string based on the provided format.
 * Supports 'YYYY', 'MM', 'DD' tokens with '-' separator.
 *
 * @param {Date|string} date - The date to format. Can be a Date object or a string.
 * @param {string} [formatStr='YYYY-MM-DD'] - The format string.
 * @returns {string} The formatted date string or an empty string if the input date is invalid.
 *
 * @example
 * formatDate(new Date('2024-01-20'), 'YYYY-MM-DD') // returns '2024-01-20'
 * formatDate('2024-02-15', 'MM-DD-YYYY') // returns '02-15-2024'
 * formatDate(null) // returns ''
 */
const formatDate = (date, formatStr = 'YYYY-MM-DD') => {
    if (date == null) {
      return '';
    }

    let dateObj;

    if (date instanceof Date) {
        dateObj = date;
    } else if (typeof date === 'string') {
        try {
            dateObj = new Date(date);
             if (!isValid(dateObj)) {
                console.error("Invalid date string provided to formatDate:", date);
                 return '';
             }
        } catch (error) {
            console.error("Error creating date object:", error);
             return '';
        }

    } else {
        console.error("Invalid input type provided to formatDate:", date);
        return '';
    }


  // Check if the date object is valid, if not, return an empty string
    if (!isValid(dateObj)) {
        console.error("Invalid date object provided to formatDate:", date);
        return '';
    }

    // Validate the format string, only allow YYYY, MM, DD separated by -
    const validFormatRegex = /^(YYYY|MM|DD)(-(YYYY|MM|DD)){0,2}$/;
    if (!validFormatRegex.test(formatStr)) {
      console.error("Invalid format string provided to formatDate:", formatStr);
      return '';
    }

  try {
        return format(dateObj, formatStr);
  } catch(error){
      console.error('Error formatting date:', error);
      return '';
  }

};


/**
 * Truncates a string to a specified maximum length and appends '...' if truncated.
 *
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {string} The truncated string or an empty string if input string is invalid,
 * or original string if the string length is smaller than maxLength.
 *
 * @example
 * truncateString('This is a long string', 10) // returns 'This is a...'
 * truncateString('Short', 10) // returns 'Short'
 * truncateString(null) // returns ''
 */
const truncateString = (str, maxLength) => {
  // Handle null or undefined input
  if (str == null || typeof str !== 'string') {
    return '';
  }

    // Handle null, undefined or invalid maxLength input
    if (maxLength == null || typeof maxLength !== 'number' || maxLength < 1){
        return str;
    }

    if(str.length <= maxLength)
       return str;

    // Truncate the string if it exceeds maxLength and append '...'
  return str.slice(0, maxLength) + '...';
};



/**
 * Sanitizes a string by removing leading/trailing whitespaces and HTML tags/attributes.
 *
 * @param {string} str - The string to sanitize.
 * @returns {string} The sanitized string or an empty string for null, undefined, or non-string input.
 *
 * @example
 * sanitizeString('  <p>Test String</p>  ') // returns 'Test String'
 * sanitizeString(null) // returns ''
 */
const sanitizeString = (str) => {
  // Handle null or undefined input
    if (str == null) {
      return '';
    }
  // Handle non-string input
    if(typeof str !== 'string') {
        return '';
    }

  // Remove leading and trailing whitespaces, and HTML tags and attributes
  const sanitized = str.trim().replace(/<[^>]*>?/gm, '');

  return sanitized;
};



/**
 * Generates a cryptographically secure random string of specified length using crypto module.
 *
 * @param {number} length - The length of the random string to generate.
 * @returns {string} A cryptographically secure random string.
 * @throws {Error} If the length is not a number or less than 1.
 *
 * @example
 * generateRandomString(20) // returns a random string of 20 characters
 */
const generateRandomString = (length) => {
  // Handle null or undefined input for length
    if (length == null) {
       return '';
    }
  // Check if the length is a valid number and greater than 0
  if (typeof length !== 'number' || length < 1) {
      console.error("Invalid input to generateRandomString, must be a number greater than 0:", length);
    throw new Error('Length must be a number greater than 0.');
  }

  try {
      // Generate random bytes
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
     // Convert bytes to hexadecimal string and truncate to the desired length
    return randomBytes.toString('hex').slice(0, length);
  } catch (error) {
      console.error('Error generating random string:', error);
      throw error;
  }
};


export { isValidEmail, formatDate, truncateString, sanitizeString, generateRandomString };