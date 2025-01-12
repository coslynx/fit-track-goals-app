import React from 'react';

/**
 * Button Component
 *
 * A reusable button component that renders a button element with customizable text, styles, and click handling.
 *
 * @param {object} props - The component's props.
 * @param {string} props.text - The text to display on the button. (Required)
 * @param {function} props.onClick - The function to call when the button is clicked. (Required)
 * @param {object} [props.style] - Optional custom styles to apply to the button.
 * @param {string} [props.className] - Optional CSS class name to apply to the button.
 *
 * @returns {JSX.Element} A button element with the specified text, styles, and click handler.
 *
 * @example
 * // Usage:
 * <Button text="Click Me" onClick={() => console.log('Button Clicked')} style={{ backgroundColor: 'blue' }} className="my-button" />
 */
const Button = ({ text, onClick, style, className }) => {
  // Validate input props
  if (typeof text !== 'string' || text.trim() === '') {
    console.error('Button component requires a non-empty string for the text prop.');
    return null; // Or handle the error in a way your application expects
  }

  if (typeof onClick !== 'function') {
    console.error('Button component requires a function for the onClick prop.');
    return null; // Or handle the error in a way your application expects
  }


  // Define default styles
  const defaultStyle = {
    padding: '10px 20px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontWeight: 'bold',
     borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.5)'
      },
    '&:active': {
        transform: 'scale(0.95)',
      }
  };

  // Merge default and custom styles (if available)
    let mergedStyle = { ...defaultStyle };
    if (style && typeof style === 'object') {
        try {
            mergedStyle = { ...mergedStyle, ...style };
        } catch(error){
             console.error("Error merging custom style for button: ", error);
        }
    }
   
  // Use arrow function to avoid creating a new function each render
  const handleClick = () => {
    onClick();
  };

  // Render button with applied styles and event handler
  return (
      <button
        className={className}
        style={mergedStyle}
        onClick={handleClick}
      >
      {text}
    </button>
  );
};

export default Button;