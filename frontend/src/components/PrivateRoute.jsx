import React, { useEffect, useState } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Cookies from "js-cookie"; // Import js-cookie

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useUserContext();
  const location = useLocation(); // Get current URL
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!isAuthenticated()) {
      const queryParams = new URLSearchParams(location.search); // Extract query parameters
      const ageRange = queryParams.get("ageRange");
      const gender = queryParams.get("gender");
      const startDate = queryParams.get("startDate");
      const endDate = queryParams.get("endDate");

      // Set these values in cookies with a 7-day expiration if present
      if (ageRange) Cookies.set("ageRange", ageRange, { expires: 7 });
      if (gender) Cookies.set("gender", gender, { expires: 7 });
      if (startDate) Cookies.set("startDate", startDate, { expires: 7 });
      if (endDate) Cookies.set("endDate", endDate, { expires: 7 });
    }

    // Simulate loading time for demonstration purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [isAuthenticated, location]);

  // Show a loading state while checking authentication
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Check if the URL contains any query parameters
  const hasQueryParams = location.search !== "";

  // If the user is authenticated, render the requested component
  if (isAuthenticated()) {
    return element;
  }

  // If user is not authenticated and there are query parameters, show the access denied message
  if (!isAuthenticated() && hasQueryParams) {
    return (
      <div className="flex flex-col items-center h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
        <div className="bg-white shadow-lg mt-10 rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-lg text-gray-700 mb-6">
            Please login or register to view charts.
          </p>
          <Link
            to="/login"
            state={{ from: location }} // Store the current URL for redirection after login
            className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  // If the user is not authenticated and there are no query parameters (base URL), redirect to login page
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
