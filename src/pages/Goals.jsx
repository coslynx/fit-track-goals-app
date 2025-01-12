import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import GoalCard from '../components/GoalCard';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import { post } from '../services/api';

/**
 * Goals Component
 *
 * This component displays a list of user's fitness goals, allows users to add new goals via a modal,
 * and provides edit/delete actions for existing goals.
 *
 * @returns {JSX.Element|null} The Goals page layout with goal list and modal, or null if the user is not authenticated.
 *
 * @example
 * // Usage:
 * <Goals />
 */
const Goals = () => {
    const { isAuthenticated, user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [error, setError] = useState('');
    const goalsPageId = React.useId();


    // Check if the user is authenticated
    if (!isAuthenticated || !user) {
        console.warn("User is not authenticated, returning null.");
        return null;
    }

    const { data: goals, isLoading, error: fetchError } = useFetch('/api/goals');


    // Default styles for the Goals container
    const defaultContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center',
    };

    const defaultGoalListStyle = {
        width: '100%',
        maxWidth: '800px',
        marginTop: '20px',
    };

    const defaultFormStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        maxWidth: '400px',
        margin: '20px auto',
         backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
    };

     const defaultInputStyle = {
        marginBottom: '10px',
    };

     const defaultButtonStyle = {
      marginTop: '10px',
     };


    let mergedContainerStyle = { ...defaultContainerStyle };
    let mergedGoalListStyle = { ...defaultGoalListStyle };
     let mergedFormStyle = { ...defaultFormStyle };
    let mergedInputStyle = { ...defaultInputStyle };
    let mergedButtonStyle = { ...defaultButtonStyle };


    // Toggle modal visibility
    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
        // Reset the form on modal open
          if (!isModalOpen) {
              setTitle('');
              setDescription('');
              setTargetDate('');
              setError('');
          }
    };

    // Handles input changes
    const handleInputChange = (e, setter) => {
        setter(e.target.value);
        setError('');
    };


    // Sanitize input
    const sanitizeInput = (value) => {
        if(typeof value === 'string'){
            try {
                const tempDiv = document.createElement('div');
                tempDiv.textContent = value;
                return tempDiv.innerHTML;
            } catch (error) {
                console.error("Error sanitizing input value: ", error);
                return '';
            }
        }
        return '';
    };

    // Handle form submit to create new goal
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

          // Sanitize user inputs
          const sanitizedTitle = sanitizeInput(title);
          const sanitizedDescription = sanitizeInput(description);
          const sanitizedTargetDate = sanitizeInput(targetDate);

        // Input validations
      if (sanitizedTitle.trim() === '') {
        setError('Title is required.');
        return;
      }
      if (sanitizedDescription.trim() === '') {
          setError('Description is required.');
          return;
      }
      if (sanitizedTargetDate.trim() === '') {
          setError('Target date is required.');
           return;
        }

        try {
            const newGoal = {
                title: sanitizedTitle,
                description: sanitizedDescription,
                targetDate: sanitizedTargetDate
            };

            await post('/api/goals', newGoal);
            handleModalToggle(); // Close the modal after successful goal creation
             console.log('Goal created successfully');


        } catch (err) {
            setError(err.message || 'Failed to create goal. Please try again.');
            console.error('Error creating goal:', err);
        }
    };
    // Handles edit action for the goal
    const handleEdit = (goalId) => {
      console.log('Edit goal with id:', goalId);
    };

    // Handles delete action for the goal
    const handleDelete = (goalId) => {
      console.log('Delete goal with id:', goalId);
    };



    return (
        <div style={mergedContainerStyle}>
            <main role="main" aria-labelledby={goalsPageId}>
                  <h1 id={goalsPageId}>Your Goals</h1>
                 <Button text="Add New Goal" onClick={handleModalToggle} style={mergedButtonStyle}  aria-label="Open Add Goal Modal" />
                {isLoading ? (
                    <p>Loading...</p>
                ) : fetchError ? (
                    <p style={{ color: 'red' }}>Error: {fetchError.message || 'Failed to load goals.'}</p>
                ) : goals && goals.length > 0 ? (
                    <section style={mergedGoalListStyle} aria-label="User Goals">
                        {goals.map((goal) => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onEdit={() => handleEdit(goal.id)}
                                onDelete={() => handleDelete(goal.id)}
                            />
                        ))}
                    </section>
                ) : (
                    <p>No goals yet.</p>
                )}
            </main>
             <Modal isOpen={isModalOpen} onClose={handleModalToggle} aria-label="Add New Goal Modal">
                 <form onSubmit={handleSubmit} style={mergedFormStyle}>
                     <label htmlFor="goalTitle" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
                        <Input
                            type="text"
                            id="goalTitle"
                            placeholder="Enter goal title"
                            value={title}
                            onChange={(e) => handleInputChange(e, setTitle)}
                            style={mergedInputStyle}
                            aria-label="Goal Title Input"

                        />
                     <label htmlFor="goalDescription" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                        <Input
                            type="text"
                            id="goalDescription"
                            placeholder="Enter goal description"
                            value={description}
                            onChange={(e) => handleInputChange(e, setDescription)}
                            style={mergedInputStyle}
                             aria-label="Goal Description Input"
                        />
                     <label htmlFor="goalTargetDate" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Target Date</label>
                        <Input
                            type="date"
                            id="goalTargetDate"
                            placeholder="Enter target date"
                            value={targetDate}
                            onChange={(e) => handleInputChange(e, setTargetDate)}
                            style={mergedInputStyle}
                            aria-label="Goal Target Date Input"
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Button text="Create Goal" type="submit" style={mergedButtonStyle}  aria-label="Create Goal Button" />
                        <Button text="Cancel" onClick={handleModalToggle} style={mergedButtonStyle}  aria-label="Cancel Create Goal Modal Button" />

                 </form>
             </Modal>
        </div>
    );
};

export default Goals;