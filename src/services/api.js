import axios from 'axios';

// Define the base URL for the API.
// Fallback to a default if the environment variable is not set.
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Validate the base URL
try {
  new URL(baseURL);
} catch (error) {
  console.error("Invalid base URL:", baseURL, error);
  throw new Error("Invalid API base URL configured.");
}


// Create an axios instance with the base URL.
const api = axios.create({
  baseURL,
});

// Request interceptor to add the Authorization header with a JWT token if available.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // check for sensitive data in url and log a warning
    if (config.url && (config.url.includes("password") || config.url.includes("secret") || config.url.includes("token"))) {
      console.warn("Potential sensitive information in the URL: ", config.url);
    }
    return config;
  },
  (error) => {
    // Log request error for debugging
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);


// Response interceptor to handle 401 Unauthorized responses.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logout the user and redirect to login page
      localStorage.removeItem('token');
      window.location.href = '/'; // Assuming '/' is your login route
      console.warn('Unauthorized access. Logging out user.');
    }
    // Log response errors for debugging
    console.error('Response Error:', error);

      // Format the error response
      const formattedError = {
        message: error.message,
        code: error.response?.status,
        statusText: error.response?.statusText
      };
    return Promise.reject(formattedError);
  }
);


// Helper function to handle all http requests
const apiCall = async (method, url, data = null) => {
  try {
    const response = await api.request({
      method: method,
      url: url,
      data: data,
    });
    return response.data;
  } catch (error) {
    // if error is already formatted, return the error
    if (error.message && error.code) {
      return Promise.reject(error);
    }

    // Format the error response for other errors
    const formattedError = {
      message: error.message || 'A network error occurred.',
      code: error.code,
      statusText: error.statusText
    };
    return Promise.reject(formattedError);
  }
};

// Export methods for each common HTTP method
const get = (url) => apiCall('get', url);

const post = (url, data) => apiCall('post', url, data);

const put = (url, data) => apiCall('put', url, data);

const deleteRequest = (url) => apiCall('delete', url);


export { get, post, put, deleteRequest as delete };