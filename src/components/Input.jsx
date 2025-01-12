import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input Component
 *
 * A reusable input component that renders an HTML input element with customizable type, placeholder,
 * value, change handling, styles, and class names. It also includes input sanitization and validation.
 *
 * @param {object} props - The component's props.
 * @param {string} [props.type='text'] - The type of input element. Default is 'text'.
 * @param {string} [props.placeholder] - The placeholder text for the input element.
 * @param {string} [props.value] - The current value of the input element.
 * @param {function} props.onChange - The function to call when the input value changes. (Required)
 * @param {object} [props.style] - Optional custom styles to apply to the input element.
 * @param {string} [props.className] - Optional CSS class name to apply to the input element.
 *
 * @returns {JSX.Element} An input element with the specified props.
 *
 * @example
 * // Usage:
 * <Input
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   style={{ backgroundColor: '#f0f0f0' }}
 *   className="my-input"
 * />
 */
const Input = ({ type = 'text', placeholder, value, onChange, style, className }) => {
  // Input validation
  const validTypes = ['text', 'email', 'password', 'number', 'tel', 'date', 'datetime-local', 'month', 'search', 'time', 'url', 'week'];
  if (typeof type !== 'string' || !validTypes.includes(type)) {
      console.error('Input component requires a valid HTML input type for the type prop.');
    return null;
  }

  if (typeof onChange !== 'function') {
    console.error('Input component requires a function for the onChange prop.');
    return null;
  }

  // Default styles
  const defaultStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  };


  // Merge default and custom styles
  let mergedStyle = { ...defaultStyle };
  if (style && typeof style === 'object') {
      try {
        mergedStyle = { ...mergedStyle, ...style };
      } catch (error) {
          console.error("Error merging custom styles for input: ", error);
      }
  }

  // Sanitize input value for XSS prevention
    let sanitizedValue = value || '';
    try {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = value;
        sanitizedValue = tempDiv.innerHTML;
    } catch (error) {
        console.error("Error sanitizing input value: ", error);
    }

    // Generate a unique ID for accessibility
    const inputId = React.useId();

    // Handle input changes
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <>
        <input
            id={inputId}
            type={type}
            placeholder={placeholder}
            value={sanitizedValue}
            onChange={handleChange}
            style={mergedStyle}
            className={className}
        />
    </>

  );
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
};


export default Input;