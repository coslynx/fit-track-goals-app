import React from 'react';

/**
 * Modal Component
 *
 * A reusable modal component that renders a modal dialog with customizable content, visibility, and styling.
 *
 * @param {object} props - The component's props.
 * @param {boolean} props.isOpen - Indicates whether the modal is open. (Required)
 * @param {function} props.onClose - The function to call when the modal is closed. (Required)
 * @param {React.ReactNode} props.children - The content to display inside the modal. (Required)
 * @param {object} [props.style] - Optional custom styles to apply to the modal overlay.
 * @param {string} [props.className] - Optional CSS class name to apply to the modal overlay.
 *
 * @returns {JSX.Element|null} A modal overlay with content when isOpen is true, otherwise null.
 *
 * @example
 * // Usage:
 * <Modal isOpen={true} onClose={() => console.log('Modal closed')} style={{ backgroundColor: 'lightblue' }} className="my-modal">
 *   <p>This is the modal content.</p>
 * </Modal>
 */
const Modal = ({ isOpen, onClose, children, style, className }) => {
  // Input validation
  if (typeof isOpen !== 'boolean') {
    console.error('Modal component requires a boolean value for the isOpen prop.');
    return null;
  }

  if (typeof onClose !== 'function') {
    console.error('Modal component requires a function for the onClose prop.');
    return null;
  }

  if (!isOpen) {
    return null;
  }

    // Default styles for the modal overlay
    const defaultOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };
    
    // Default styles for the modal content
    const defaultContentStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative'
    };

  // Merge default styles with custom styles
    let mergedOverlayStyle = { ...defaultOverlayStyle };
    let mergedContentStyle = { ...defaultContentStyle };
  if (style && typeof style === 'object') {
        try {
          mergedOverlayStyle = {...mergedOverlayStyle, ...style};
            mergedContentStyle = {...mergedContentStyle, ...style.content}
        } catch (error) {
            console.error("Error merging custom styles for modal: ", error);
        }
  }
    
  const handleClose = () => {
    onClose();
  };


  // Sanitize the modal content to prevent XSS attacks.
    let sanitizedChildren = children;
    if(typeof children === 'string'){
        try {
           const tempDiv = document.createElement('div');
           tempDiv.textContent = children;
           sanitizedChildren = <div dangerouslySetInnerHTML={{ __html: tempDiv.innerHTML }} />;
        } catch (error) {
           console.error("Error sanitizing modal content: ", error);
        }
    }


  return (
    <div
        className={className}
        style={mergedOverlayStyle}
        aria-modal="true"
        role="dialog"
    >
        <div style={mergedContentStyle}>
            <button
                onClick={handleClose}
                className="modal-close-button"
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '20px',
                }}
               role="button"
               aria-label="Close Modal"
            >
                X
            </button>
             {sanitizedChildren}
        </div>
    </div>
  );
};

export default Modal;