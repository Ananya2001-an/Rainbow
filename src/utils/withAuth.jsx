import React, { useEffect } from 'react';
// import Loader from '../components/Loader';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const WrapperComponent = (props) => {
    const { currentUser } = useAuth(); // Access the currentUser from authContext
    const navigate = useNavigate();

    // useEffect(() => {
    //   // Check if user is not authenticated, redirect to login page
    //   if (currentUser === undefined || currentUser === null) {
    //     navigate('/login');
    //   }
    // }, [currentUser]);

    // Render the wrapped component if user is authenticated
    return (
      <>
        {/* {loading && <Loader />} */}
        {currentUser && <WrappedComponent {...props} />}
      </>
    );
  };

  return WrapperComponent;
};

export default withAuth;