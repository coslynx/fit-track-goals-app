import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Home Component
 *
 * This component serves as the landing page for the application. It displays a welcome message and a brief
 * description of the application's purpose. It also includes navigation links via the Header component and copyright
 * information via the Footer component.
 *
 * @returns {JSX.Element} The Home page layout with welcome message, description, header and footer.
 *
 * @example
 * // Usage:
 * <Home />
 */
const Home = () => {
  // Generate a unique ID for accessibility purposes
  const mainSectionId = React.useId();
  
  // Default styles for the home container
  const defaultContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

    // Default styles for the main content section
    const defaultContentStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
    };
    
  // Merge default and custom styles. No custom style is needed for this page.
  let mergedContainerStyle = { ...defaultContainerStyle };
  let mergedContentStyle = { ...defaultContentStyle };

  // Sanitize heading and paragraph text for XSS prevention
  let sanitizedHeading = 'Welcome to Fitness Tracker';
  let sanitizedParagraph = 'Track your fitness goals, achieve your milestones, and share your progress with friends.';
  
    try {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = sanitizedHeading;
        sanitizedHeading = tempDiv.innerHTML;
    } catch (error) {
        console.error('Error sanitizing heading:', error);
    }
  
     try {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = sanitizedParagraph;
        sanitizedParagraph = tempDiv.innerHTML;
    } catch (error) {
        console.error('Error sanitizing paragraph:', error);
    }

    return (
      <div style={mergedContainerStyle} className="home-container">
          <Header />
            <main style={mergedContentStyle} className="home-content" role="main" aria-labelledby={mainSectionId}>
                <h1 id={mainSectionId}  dangerouslySetInnerHTML={{ __html: sanitizedHeading }}/>
                 <p  dangerouslySetInnerHTML={{ __html: sanitizedParagraph }}/>
            </main>
        <Footer />
      </div>
    );
};

export default Home;