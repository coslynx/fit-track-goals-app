import { post } from './api';

const login = async (user) => {
  try {
    if (!user || !user.email || !user.password) {
       console.error("Invalid input:", user);
        throw {
          message: "Email and password are required",
          code: 400,
          statusText: "Bad Request"
        };
    }

      // Log sensitive data with a warning before sending to the API
    if (user.password) {
        console.warn("Sending sensitive data (password) to the API for login.");
    }

    const response = await post('/auth/login', {
      email: user.email,
      password: user.password,
    });

    if (response && response.token) {
        localStorage.setItem('token', response.token);
        console.log("Login successful, token stored in localStorage.");
        return response;
    } else {
      console.error("Invalid response from login API:", response);
        throw {
          message: "Invalid response from login API",
           code: 500,
           statusText: "Internal Server Error"
        };
    }


  } catch (error) {
    console.error("Login failed:", error);
      // If error is already formatted, return the error
      if (error.message && error.code) {
          return Promise.reject(error);
      }

      const formattedError = {
        message: error.message || 'A network error occurred during login.',
        code: error.code,
        statusText: error.statusText
      };
    return Promise.reject(formattedError);
  }
};

const register = async (user) => {
  try {
      if (!user || !user.username || !user.email || !user.password) {
          console.error("Invalid input:", user);
          throw {
              message: "Username, email, and password are required",
              code: 400,
              statusText: "Bad Request"
          };
      }

    // Log sensitive data with a warning before sending to the API
    if (user.password) {
      console.warn("Sending sensitive data (password) to the API for registration.");
    }


    const response = await post('/auth/register', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    console.log("Registration successful:", response);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
      // If error is already formatted, return the error
      if (error.message && error.code) {
          return Promise.reject(error);
      }
    const formattedError = {
      message: error.message || 'A network error occurred during registration.',
        code: error.code,
        statusText: error.statusText
    };
    return Promise.reject(formattedError);
  }
};

const logout = () => {
    localStorage.removeItem('token');
  console.log("User logged out, token removed from localStorage.");
};

const getToken = () => {
  const token = localStorage.getItem('token');
  return token || null;
};

export { login, register, logout, getToken };