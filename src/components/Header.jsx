import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * Header Component
 *
 * A reusable header component that displays navigation links and user authentication status.
 *
 * @param {object} props - The component's props.
 * @param {object} [props.style] - Optional custom styles to apply to the header.
 * @param {object} [props.navStyle] - Optional custom styles to apply to the navigation links container.
 * @param {object} [props.linkStyle] - Optional custom styles to apply to the navigation links.
 * @param {string} [props.className] - Optional CSS class name to apply to the header container.
 *
 * @returns {JSX.Element} A header element with navigation links based on authentication status.
 *
 * @example
 * // Usage:
 * <Header style={{ backgroundColor: '#444' }} className="my-header" navStyle={{ gap: '30px' }} linkStyle={{ fontWeight: 'bold'}} />
 */
const Header = ({ style, navStyle, linkStyle, className }) => {
    const { isAuthenticated, logout, user } = useAuth();
    const headerId = React.useId();

  // Default styles for the header
  const defaultHeaderStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

    // Default styles for the navigation links container
    const defaultNavStyle = {
        display: 'flex',
        gap: '20px',
    };

    // Default styles for the navigation links
    const defaultLinkStyle = {
        color: 'white',
        textDecoration: 'none',
    };
    const defaultLogoutButtonStyle = {
      backgroundColor: '#555',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      cursor: 'pointer',
      borderRadius: '4px',
        '&:hover':{
            backgroundColor: '#777'
        }
  };


  // Merge default and custom styles
    let mergedHeaderStyle = { ...defaultHeaderStyle };
    let mergedNavStyle = { ...defaultNavStyle };
    let mergedLinkStyle = { ...defaultLinkStyle };
    let mergedLogoutButtonStyle = { ...defaultLogoutButtonStyle};

    if (style && typeof style === 'object') {
      try {
        mergedHeaderStyle = { ...mergedHeaderStyle, ...style };
      } catch (error) {
        console.error("Error merging custom styles for header:", error);
      }
    }

    if (navStyle && typeof navStyle === 'object') {
      try {
        mergedNavStyle = { ...mergedNavStyle, ...navStyle };
      } catch (error) {
        console.error("Error merging custom styles for navigation:", error);
      }
    }

    if (linkStyle && typeof linkStyle === 'object') {
      try {
          mergedLinkStyle = { ...mergedLinkStyle, ...linkStyle };
      } catch (error) {
        console.error("Error merging custom styles for link:", error);
      }
    }
  
    // Sanitize the className prop for XSS prevention
    let sanitizedClassName = className || '';
    try{
        const tempDiv = document.createElement('div');
        tempDiv.textContent = className;
        sanitizedClassName = tempDiv.innerHTML;
    } catch(error) {
        console.error("Error sanitizing className: ", error);
        sanitizedClassName = '';
    }

    return (
    <header style={mergedHeaderStyle} className={sanitizedClassName} id={headerId}>
        <nav style={mergedNavStyle} aria-label="Main Navigation">
        {isAuthenticated ? (
            <>
                <Link to="/dashboard" style={mergedLinkStyle} aria-label="Go to Dashboard">Dashboard</Link>
                <Link to="/goals" style={mergedLinkStyle} aria-label="Go to Goals">Goals</Link>
            </>
        ) : (
            <>
                <Link to="/login" style={mergedLinkStyle} aria-label="Go to Login">Login</Link>
                <Link to="/register" style={mergedLinkStyle} aria-label="Go to Register">Register</Link>
            </>
        )}
        </nav>
      {isAuthenticated && (
        <button
          style={mergedLogoutButtonStyle}
          onClick={logout}
          role="button"
          aria-label="Logout"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;