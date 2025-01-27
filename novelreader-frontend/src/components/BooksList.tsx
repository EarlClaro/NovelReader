"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Book Library</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book: any) => (
            <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-500 mt-2">{book.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksList;
