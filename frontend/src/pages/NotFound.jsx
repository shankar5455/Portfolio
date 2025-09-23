// src/pages/NotFound.jsx
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-6xl font-semibold my-font text-purple-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold my-font text-gray-dark mb-6">Page Not Found</h2>
      <p className="text-gray mb-6 text-center">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <a 
        href="/" 
        className="btn btn-primary px-6 py-2 rounded-lg shadow-md"
      >
        Go Back Home
      </a>
    </div>
  );
}
