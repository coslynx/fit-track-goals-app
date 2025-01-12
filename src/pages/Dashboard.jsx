import React from 'react';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import GoalCard from '../components/GoalCard';

/**
 * Dashboard Component
 *
 * This component serves as the main dashboard for authenticated users. It displays a personalized welcome message
 * and a list of their fitness goals.
 *
 * @returns {JSX.Element|null} The Dashboard page layout with welcome message, goals, or null if the user is not authenticated.
 *
 * @example
 * // Usage:
 * <Dashboard />
 */
const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
    const dashboardId = React.useId();

  // Check if the user is authenticated
  if (!isAuthenticated || !user) {
      console.warn("User is not authenticated, returning null.");
      return null;
  }

    // Sanitize user's name for XSS prevention
    let sanitizedUsername = user.username;
    try {
       const tempDiv = document.createElement('div');
       tempDiv.textContent = user.username;
       sanitizedUsername = tempDiv.innerHTML;
    } catch(error) {
        console.error("Error sanitizing username: ", error);
        sanitizedUsername = 'User';
    }


  const { data: goals, isLoading, error } = useFetch('/api/goals');

  // Default styles for the dashboard container
    const defaultContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center'
    };
    const defaultGoalListStyle = {
        width: '100%',
        maxWidth: '800px',
        marginTop: '20px'
    };

    let mergedContainerStyle = { ...defaultContainerStyle };
    let mergedGoalListStyle = { ...defaultGoalListStyle};


  return (
    <div style={mergedContainerStyle}>
      <main role="main" aria-labelledby={dashboardId}>
           <h1 id={dashboardId} >Welcome, <span dangerouslySetInnerHTML={{ __html: sanitizedUsername }} /></h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
            <p style={{ color: 'red' }}>Error: {error.message || 'Failed to load goals.'}</p>
        ) : goals && goals.length > 0 ? (
            <section style={mergedGoalListStyle} aria-label="User Goals">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal}
                        onEdit={() => console.log('Edit goal with id:', goal.id)}
                        onDelete={() => console.log('Delete goal with id:', goal.id)}
                         />
                 ))}
            </section>
        ) : (
          <p>No goals yet.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;