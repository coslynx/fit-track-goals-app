import React from 'react';

/**
 * Footer Component
 *
 * A reusable footer component that displays copyright information and optional links at the bottom of the page.
 *
 * @param {object} props - The component's props.
 * @param {object} [props.style] - Optional custom styles to apply to the footer.
 * @param {string} [props.className] - Optional CSS class name to apply to the footer.
 * @param {string} [props.copyrightText='© 2024 Fitness Tracker. All Rights Reserved.'] - Optional copyright text.
 *
 * @returns {JSX.Element} A footer element with copyright information.
 *
 * @example
 * // Usage:
 * <Footer style={{ backgroundColor: '#222', color: 'white' }} className="my-footer" copyrightText="© 2024 My Company" />
 */
const Footer = ({ style, className, copyrightText = '© 2024 Fitness Tracker. All Rights Reserved.' }) => {

    // Default styles for the footer container
    const defaultFooterStyle = {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        color: '#333',
        textAlign: 'center',
    };

    // Merge default and custom styles
    let mergedStyle = { ...defaultFooterStyle };
    if (style && typeof style === 'object') {
        try {
            mergedStyle = { ...mergedStyle, ...style };
        } catch (error) {
            console.error("Error merging custom styles for footer:", error);
        }
    }

    // Sanitize the className prop for XSS prevention
    let sanitizedClassName = className || '';
    try {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = className;
        sanitizedClassName = tempDiv.innerHTML;
    } catch (error) {
        console.error("Error sanitizing className: ", error);
         sanitizedClassName = '';
    }

    // Sanitize copyright text
     let sanitizedCopyrightText = copyrightText;
        try{
           const tempDiv = document.createElement('div');
           tempDiv.textContent = copyrightText;
            sanitizedCopyrightText = tempDiv.innerHTML;
        } catch (error) {
            console.error("Error sanitizing copyright text:", error);
        }

    return (
        <footer style={mergedStyle} className={sanitizedClassName} role="contentinfo">
            <p dangerouslySetInnerHTML={{__html: sanitizedCopyrightText}}/>
        </footer>
    );
};

export default Footer;