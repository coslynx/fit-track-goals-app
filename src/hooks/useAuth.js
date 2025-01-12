import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as authLogin, register as authRegister, logout as authLogout } from '../services/auth';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const login = async (email, password) => {
    try {
      const response = await authLogin({ email, password });
        if (response && response.user) {
             context.setUser(response.user);
        }
        return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
      try {
          const response = await authRegister({ username, email, password });
          if (response && response.user) {
              context.setUser(response.user);
          }
           return response;
      } catch (error) {
          console.error('Registration failed:', error);
          throw error;
      }
  };


  const logout = () => {
    try {
      authLogout();
        context.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const { user, isAuthenticated, isLoading } = context;

  return {
    login,
    register,
    logout,
    user,
    isAuthenticated,
    isLoading,
  };
};

export default useAuth;