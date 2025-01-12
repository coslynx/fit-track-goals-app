import React from 'react';

/**
 * GoalCard Component
 *
 * A reusable component that displays a user's fitness goal, including its title,
 * description, progress, and target date, along with edit and delete actions.
 *
 * @param {object} props - The component's props.
 * @param {object} props.goal - An object containing goal details. (Required)
 * @param {string} props.goal.id - The unique identifier of the goal (Required).
 * @param {string} props.goal.title - The title of the goal (Required).
 * @param {string} props.goal.description - The description of the goal (Required).
 * @param {number} props.goal.progress - The progress of the goal (Required).
 * @param {string} props.goal.targetDate - The target date of the goal. (Required).
 * @param {function} props.onEdit - The function called when the edit action is triggered. (Required)
 * @param {function} props.onDelete - The function called when the delete action is triggered. (Required)
 *
 * @returns {JSX.Element|null} A card displaying the goal details, or null if props are invalid.
 *
 * @example
 * // Usage:
 * <GoalCard
 *   goal={{
 *     id: '1',
 *     title: 'Run a Marathon',
 *     description: 'Complete a full marathon in under 4 hours.',
 *     progress: 50,
 *     targetDate: '2024-12-31',
 *   }}
 *   onEdit={() => console.log('Edit clicked')}
 *   onDelete={() => console.log('Delete clicked')}
 * />
 */
const GoalCard = ({ goal, onEdit, onDelete }) => {
  // Input validation for the goal prop
  if (!goal || typeof goal !== 'object') {
    console.error('GoalCard component requires a goal prop that is an object.');
    return null;
  }

    if (!goal.id || typeof goal.id !== 'string' || goal.id.trim() === '') {
        console.error('GoalCard component requires a valid id for the goal prop.');
        return null;
    }


  if (!goal.title || typeof goal.title !== 'string') {
      console.error('GoalCard component requires a valid title for the goal prop.');
    return null;
  }

  if (!goal.description || typeof goal.description !== 'string') {
      console.error('GoalCard component requires a valid description for the goal prop.');
    return null;
  }


    if (typeof goal.progress !== 'number' || goal.progress < 0 || goal.progress > 100) {
        console.error('GoalCard component requires a valid progress between 0 and 100 for the goal prop.');
         goal.progress = 0;
    }

    if (!goal.targetDate || typeof goal.targetDate !== 'string') {
        console.error('GoalCard component requires a valid targetDate for the goal prop.');
         return null;
    }

    //Sanitize the title and description
    let sanitizedTitle = goal.title;
    let sanitizedDescription = goal.description;

      try {
          const tempDiv = document.createElement('div');
          tempDiv.textContent = goal.title;
          sanitizedTitle = tempDiv.innerHTML;
      } catch (error) {
           console.error("Error sanitizing title: ", error);
      }

      try {
          const tempDiv = document.createElement('div');
          tempDiv.textContent = goal.description;
          sanitizedDescription = tempDiv.innerHTML;
      } catch(error) {
        console.error("Error sanitizing description: ", error);
      }

  // Format the target date
  let formattedTargetDate;
    try{
        formattedTargetDate = new Date(goal.targetDate).toLocaleDateString();
    } catch(error) {
        console.error("Error formatting the target date:", error);
      formattedTargetDate = 'Invalid Date';
    }

  // Default styles
  const containerStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    backgroundColor: '#f0f0f0',
  };

  const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const actionStyle = {
    cursor: 'pointer',
      margin: '5px',
  };

    const progressBarStyle = {
        backgroundColor: '#4caf50',
        height: '10px',
        width: `${goal.progress}%`,
        transition: 'width 0.3s ease',
        borderRadius: '5px'
    }
    const progressContainerStyle = {
        width: '100%',
        height: '10px',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        marginBottom: '10px'
    };
    const actionsContainerStyle = {
       display: 'flex',
       justifyContent: 'flex-end',
       marginTop: '10px',
    };


  return (
    <div style={containerStyle}>
      <h3 style={titleStyle} dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
      <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      <div style={progressContainerStyle} >
        <div style={progressBarStyle}></div>
      </div>
       <p>Target Date: {formattedTargetDate}</p>

        <div style={actionsContainerStyle}>
           <span style={actionStyle} onClick={onEdit} role="button" aria-label="Edit Goal">Edit</span>
           <span style={actionStyle} onClick={onDelete} role="button" aria-label="Delete Goal">Delete</span>
      </div>
    </div>
  );
};

export default GoalCard;