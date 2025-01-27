"use client";  // Ensure it's a client component for React hooks

import { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);  // Add loading state
  const [error, setError] = useState<string | null>(null); // Error handling state
  const [success, setSuccess] = useState<string | null>(null); // Success message

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Form Submitted with data:", bookData);  // Log form data for debugging

    if (loading) return; // Prevent multiple submissions while loading
    setLoading(true);  // Set loading to true

    try {
      // Make the POST request to the backend
      const response = await axios.post("http://localhost:3000/books", bookData);
      
      console.log("Book added:", response.data);  // Log success response
      setSuccess("Book added successfully!");  // Display success message
      setBookData({ title: "", author: "", description: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding book:", error);  // Log error
      setError("Failed to add book. Please try again!");  // Show error message
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Book</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error */}
        {success && <div className="text-green-500 mb-4">{success}</div>} {/* Display success */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={bookData.title}
              onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Author"
              value={bookData.author}
              onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Description"
              value={bookData.description}
              onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}  // Disable button during loading
              className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
